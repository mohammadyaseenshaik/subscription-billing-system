package com.example.subscription_billing_system.mapper;

import com.example.subscription_billing_system.dto.request.InvoiceRequestDto;
import com.example.subscription_billing_system.dto.response.InvoiceResponseDto;
import com.example.subscription_billing_system.entity.Invoice;

public class InvoiceMapper {

    public static Invoice toEntity(InvoiceRequestDto dto) {
        if (dto == null) {
            return null;
        }
        Invoice invoice = new Invoice();
        invoice.setId(dto.getId());
        invoice.setInvoiceNumber(dto.getInvoiceNumber());
        invoice.setAmount(dto.getAmount());
        invoice.setStatus(dto.getStatus());
        invoice.setDueDate(dto.getDueDate());
        invoice.setPaidDate(dto.getPaidDate());
        invoice.setPdfUrl(dto.getPdfUrl());
        return invoice;
    }

    public static InvoiceResponseDto toResponseDto(Invoice invoice) {
        if (invoice == null) {
            return null;
        }
        InvoiceResponseDto dto = new InvoiceResponseDto();
        dto.setId(invoice.getId());
        if (invoice.getSubscription() != null) {
            dto.setSubscriptionId(invoice.getSubscription().getId());
        }
        dto.setInvoiceNumber(invoice.getInvoiceNumber());
        dto.setAmount(invoice.getAmount());
        dto.setStatus(invoice.getStatus());
        if (invoice.getDueDate() != null) {
            dto.setDueDate(invoice.getDueDate().atStartOfDay());
        }
        if (invoice.getPaidDate() != null) {
            dto.setPaidAt(invoice.getPaidDate().atStartOfDay());
        }
        dto.setPdfUrl(invoice.getPdfUrl());
        return dto;
    }
}
