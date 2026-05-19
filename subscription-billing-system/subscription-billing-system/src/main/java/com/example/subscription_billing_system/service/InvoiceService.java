package com.example.subscription_billing_system.service;
import com.example.subscription_billing_system.dto.request.InvoiceRequestDto;
import com.example.subscription_billing_system.dto.response.InvoiceResponseDto;

import java.util.List;

public interface InvoiceService {

    InvoiceResponseDto createInvoice(InvoiceRequestDto invoice);

    List<InvoiceResponseDto> getAllInvoices();

    InvoiceResponseDto getInvoiceById(Long id);

    List<InvoiceResponseDto> getInvoicesBySubscription(Long subscriptionId);

    InvoiceResponseDto updateInvoiceStatus(Long invoiceId, String status);
}