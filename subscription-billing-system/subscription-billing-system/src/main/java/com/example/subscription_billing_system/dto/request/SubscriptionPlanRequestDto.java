package com.example.subscription_billing_system.dto.request;
import java.time.LocalDateTime;
import com.example.subscription_billing_system.enums.*;
import lombok.Data;
@Data
public class SubscriptionPlanRequestDto {
 private Long id;
 private String name;
 private String description;
 private SubBillingCycle billingCycle;
 private double price;
 private String feature;
 private Boolean isActive;
 private LocalDateTime createdAt;
}
