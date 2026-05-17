package com.example.subscription_billing_system.service.impl;

import com.example.subscription_billing_system.dto.request.InvoiceRequestDto;
import com.example.subscription_billing_system.dto.response.InvoiceResponseDto;
import com.example.subscription_billing_system.entity.Invoice;
import com.example.subscription_billing_system.entity.Subscription;
import com.example.subscription_billing_system.enums.InvoiceStatus;
import com.example.subscription_billing_system.mapper.InvoiceMapper;
import com.example.subscription_billing_system.repository.InvoiceRepository;
import com.example.subscription_billing_system.repository.SubscriptionRepository;
import com.example.subscription_billing_system.service.InvoiceService;
import com.example.subscription_billing_system.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final SubscriptionRepository subscriptionRepository;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository, SubscriptionRepository subscriptionRepository) {
        this.invoiceRepository = invoiceRepository;
        this.subscriptionRepository = subscriptionRepository;
    }

    @Override
    public InvoiceResponseDto createInvoice(InvoiceRequestDto invoiceRequestDto) {
        Invoice invoice = InvoiceMapper.toEntity(invoiceRequestDto);
        
        if (invoiceRequestDto.getSubscriptionId() != null) {
            Subscription subscription = subscriptionRepository.findById(invoiceRequestDto.getSubscriptionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Subscription not found with id: " + invoiceRequestDto.getSubscriptionId()));
            invoice.setSubscription(subscription);
        }

        if (invoice.getStatus() == null) {
            invoice.setStatus(InvoiceStatus.PENDING);
        }
        
        Invoice savedInvoice = invoiceRepository.save(invoice);
        return InvoiceMapper.toResponseDto(savedInvoice);
    }

    @Override
    public List<InvoiceResponseDto> getAllInvoices() {
        return invoiceRepository.findAll().stream()
                .map(InvoiceMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceResponseDto getInvoiceById(Long id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + id));
        return InvoiceMapper.toResponseDto(invoice);
    }

    @Override
    public List<InvoiceResponseDto> getInvoicesBySubscription(Long subscriptionId) {
        return invoiceRepository.findBySubscriptionId(subscriptionId).stream()
                .map(InvoiceMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceResponseDto updateInvoiceStatus(Long invoiceId, String status) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + invoiceId));

        invoice.setStatus(InvoiceStatus.valueOf(status.toUpperCase()));
        Invoice updatedInvoice = invoiceRepository.save(invoice);
        return InvoiceMapper.toResponseDto(updatedInvoice);
    }
}
