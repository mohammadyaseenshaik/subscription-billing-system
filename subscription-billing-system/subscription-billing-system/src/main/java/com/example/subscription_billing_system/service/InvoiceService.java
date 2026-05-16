package com.example.subscription_billing_system.service;
import com.example.subscription_billing_system.entity.Invoice;

import java.util.List;

public interface InvoiceService {

    Invoice createInvoice(Invoice invoice);

    List<Invoice> getAllInvoices();

    Invoice getInvoiceById(Long id);

    List<Invoice> getInvoicesBySubscription(Long subscriptionId);

    Invoice updateInvoiceStatus(Long invoiceId, String status);
}