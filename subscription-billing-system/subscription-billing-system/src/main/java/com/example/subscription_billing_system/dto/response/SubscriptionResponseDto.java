package com.example.subscription_billing_system.dto.response;

import com.example.subscription_billing_system.enums.SubscriptionStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SubscriptionResponseDto {
    private Long id;
    private Long userId;
    private String userName;
    private Long planId;
    private String planName;
    private double price;
    private SubscriptionStatus status;
    private LocalDateTime startDate;
    private LocalDateTime nextBillingDate;
    private LocalDateTime currentPeriodStart;
    private LocalDateTime currentPeriodEnd;
}
