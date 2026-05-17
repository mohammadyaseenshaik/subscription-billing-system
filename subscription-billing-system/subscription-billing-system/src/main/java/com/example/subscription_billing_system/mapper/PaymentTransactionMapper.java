package com.example.subscription_billing_system.mapper;

import com.example.subscription_billing_system.dto.request.PaymentTransactionRequestDto;
import com.example.subscription_billing_system.dto.response.PaymentTransactionResponseDto;
import com.example.subscription_billing_system.entity.PaymentTransaction;
import com.example.subscription_billing_system.enums.PaymentMethodType;

import java.math.BigDecimal;

public class PaymentTransactionMapper {
    public static PaymentTransactionResponseDto toResponseDto(PaymentTransaction transaction) {
        if (transaction == null) {
            return null;
        }
        PaymentTransactionResponseDto dto = new PaymentTransactionResponseDto();
        dto.setId(transaction.getId());
        if (transaction.getInvoice() != null) {
            dto.setInvoiceId(transaction.getInvoice().getId());
        }
        dto.setAmount(BigDecimal.valueOf(transaction.getAmount()));
        if (transaction.getPaymentMethod() != null) {
            try {
                dto.setPaymentMethod(PaymentMethodType.valueOf(transaction.getPaymentMethod()));
            } catch (IllegalArgumentException e) {
                // Keep as null if no match
            }
        }
        dto.setTransactionStatus(transaction.getTransactionStatus());
        dto.setGatewayReference(transaction.getGatewayReference());
        dto.setFailureReason(transaction.getFailureReason());
        dto.setCreatedAt(transaction.getCreatedAt());
        return dto;
    }

    public static PaymentTransaction toEntity(PaymentTransactionRequestDto dto) {
        if (dto == null) {
            return null;
        }
        PaymentTransaction transaction = new PaymentTransaction();
        transaction.setId(dto.getId());
        transaction.setAmount(dto.getAmount());
        transaction.setPaymentMethod(dto.getPaymentMethod());
        transaction.setTransactionStatus(dto.getTransactionStatus());
        transaction.setGatewayReference(dto.getGatewayReference());
        transaction.setFailureReason(dto.getFailureReason());
        transaction.setCreatedAt(dto.getCreatedAt());
        return transaction;
    }
}
