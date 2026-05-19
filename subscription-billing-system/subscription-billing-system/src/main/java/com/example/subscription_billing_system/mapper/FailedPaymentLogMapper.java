package com.example.subscription_billing_system.mapper;

import com.example.subscription_billing_system.dto.request.FailedPaymentLogRequestDto;
import com.example.subscription_billing_system.dto.response.FailedPaymentLogResponseDto;
import com.example.subscription_billing_system.entity.FailedPaymentLog;

public class FailedPaymentLogMapper {
    public static FailedPaymentLogResponseDto toResponseDto(FailedPaymentLog log) {
        if (log == null) {
            return null;
        }
        FailedPaymentLogResponseDto dto = new FailedPaymentLogResponseDto();
        dto.setId(log.getId());
        if (log.getSubscription() != null) {
            dto.setSubscriptionId(log.getSubscription().getId());
        }
        if (log.getInvoice() != null) {
            dto.setInvoiceId(log.getInvoice().getId());
        }
        dto.setRetryCount(log.getRetryCount());
        if (log.getNextRetryDate() != null) {
            dto.setNextRetryDate(log.getNextRetryDate().atStartOfDay());
        }
        dto.setStatus(log.getStatus());
        dto.setResolvedAt(log.getResolvedAt());
        return dto;
    }

    public static FailedPaymentLog toEntity(FailedPaymentLogRequestDto dto) {
        if (dto == null) {
            return null;
        }
        FailedPaymentLog log = new FailedPaymentLog();
        log.setId(dto.getId());
        log.setRetryCount(dto.getRetryCount());
        log.setNextRetryDate(dto.getNextRetryDate());
        log.setStatus(dto.getStatus());
        log.setResolvedAt(dto.getResolvedAt());
        return log;
    }
}
