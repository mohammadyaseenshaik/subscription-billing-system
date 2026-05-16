package com.example.subscription_billing_system.dto.response;
import java.time.LocalDateTime;
import com.example.subscription_billing_system.enums.*;
import lombok.Data;

@Data
public class Subscription_plansResponse {
     private Long id;
 private String name;
 private String description;
 private SubBillingCycle billingCycle;
 private double price;
 private String feature;
 private Boolean isActive;
 private LocalDateTime createdAt;

    
}
