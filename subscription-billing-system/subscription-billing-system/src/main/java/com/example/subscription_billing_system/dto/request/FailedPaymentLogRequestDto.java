package com.example.subscription_billing_system.dto.request;

import com.example.subscription_billing_system.enums.FailedPaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FailedPaymentLogRequestDto {
    private Long id;
    private Long subscriptionId;
    private Long invoiceId;
    private int retryCount;
    private LocalDate nextRetryDate;
    private FailedPaymentStatus status;
    private LocalDateTime resolvedAt;
}
