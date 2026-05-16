package com.example.subscription_billing_system.service.impl;


import com.example.subscription_billing_system.entity.Invoice;
import com.example.subscription_billing_system.enums.InvoiceStatus;
import com.example.subscription_billing_system.repository.InvoiceRepository;
import com.example.subscription_billing_system.service.InvoiceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    @Override
    public Invoice createInvoice(Invoice invoice) {
        invoice.setStatus(InvoiceStatus.PENDING);
        return invoiceRepository.save(invoice);
    }

    @Override
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    @Override
    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    @Override
    public List<Invoice> getInvoicesBySubscription(Long subscriptionId) {
        return invoiceRepository.findBySubscriptionId(subscriptionId);
    }

    @Override
    public Invoice updateInvoiceStatus(Long invoiceId, String status) {

        Invoice invoice = getInvoiceById(invoiceId);

        invoice.setStatus(InvoiceStatus.valueOf(status.toUpperCase()));

        return invoiceRepository.save(invoice);
    }
}