package com.example.subscription_billing_system.service.impl;

import com.example.subscription_billing_system.dto.request.PaymentTransactionRequestDto;
import com.example.subscription_billing_system.dto.response.PaymentTransactionResponseDto;
import com.example.subscription_billing_system.entity.Invoice;
import com.example.subscription_billing_system.entity.PaymentTransaction;
import com.example.subscription_billing_system.enums.TransactionStatus;
import com.example.subscription_billing_system.mapper.PaymentTransactionMapper;
import com.example.subscription_billing_system.repository.InvoiceRepository;
import com.example.subscription_billing_system.repository.PaymentTransactionRepository;
import com.example.subscription_billing_system.service.PaymentTransactionService;
import com.example.subscription_billing_system.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentTransactionServiceImpl implements PaymentTransactionService {

    private final PaymentTransactionRepository paymentTransactionRepository;
    private final InvoiceRepository invoiceRepository;

    public PaymentTransactionServiceImpl(PaymentTransactionRepository paymentTransactionRepository, 
                                         InvoiceRepository invoiceRepository) {
        this.paymentTransactionRepository = paymentTransactionRepository;
        this.invoiceRepository = invoiceRepository;
    }

    @Override
    public PaymentTransactionResponseDto createTransaction(PaymentTransactionRequestDto requestDto) {
        PaymentTransaction transaction = PaymentTransactionMapper.toEntity(requestDto);
        
        if (requestDto.getInvoiceId() != null) {
            Invoice invoice = invoiceRepository.findById(requestDto.getInvoiceId())
                    .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with id: " + requestDto.getInvoiceId()));
            transaction.setInvoice(invoice);
        }

        if (transaction.getTransactionStatus() == null) {
            transaction.setTransactionStatus(TransactionStatus.INITIATED);
        }
        
        if (transaction.getCreatedAt() == null) {
            transaction.setCreatedAt(LocalDateTime.now());
        }

        PaymentTransaction savedTransaction = paymentTransactionRepository.save(transaction);
        return PaymentTransactionMapper.toResponseDto(savedTransaction);
    }

    @Override
    public List<PaymentTransactionResponseDto> getAllTransactions() {
        return paymentTransactionRepository.findAll().stream()
                .map(PaymentTransactionMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PaymentTransactionResponseDto> getTransactionsByInvoice(Long invoiceId) {
        return paymentTransactionRepository.findByInvoiceId(invoiceId).stream()
                .map(PaymentTransactionMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentTransactionResponseDto updateTransactionStatus(Long transactionId, String status) {
        PaymentTransaction transaction = paymentTransactionRepository.findById(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + transactionId));

        transaction.setTransactionStatus(TransactionStatus.valueOf(status.toUpperCase()));
        PaymentTransaction updatedTransaction = paymentTransactionRepository.save(transaction);
        return PaymentTransactionMapper.toResponseDto(updatedTransaction);
    }
}
