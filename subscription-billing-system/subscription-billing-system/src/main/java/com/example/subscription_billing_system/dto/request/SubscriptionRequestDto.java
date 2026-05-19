package com.example.subscription_billing_system.dto.request;

import com.example.subscription_billing_system.enums.SubscriptionStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SubscriptionRequestDto {
    private Long userId;
    private Long planId;
    private SubscriptionStatus status;
    private LocalDateTime startDate;
    private LocalDateTime nextBillingDate;
    private LocalDateTime currentPeriodStart;
    private LocalDateTime currentPeriodEnd;
}
