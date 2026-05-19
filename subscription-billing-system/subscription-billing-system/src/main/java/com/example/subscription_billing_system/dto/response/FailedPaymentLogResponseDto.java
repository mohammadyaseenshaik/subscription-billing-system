package com.example.subscription_billing_system.dto.response;

import java.time.LocalDateTime;

import com.example.subscription_billing_system.enums.FailedPaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FailedPaymentLogResponseDto {

    private Long id;

    private Long subscriptionId;

    private Long invoiceId;

    private Integer retryCount;

    private LocalDateTime nextRetryDate;

    private FailedPaymentStatus status;

    private LocalDateTime resolvedAt;
}