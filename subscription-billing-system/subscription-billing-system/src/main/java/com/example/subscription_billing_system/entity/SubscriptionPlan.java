package com.example.subscription_billing_system.entity;

import java.time.LocalDateTime;
import com.example.subscription_billing_system.enums.SubBillingCycle;
import lombok.*;
import jakarta.persistence.*;

@Data
@Entity
@Table(name="subscription_plans")
@AllArgsConstructor
@NoArgsConstructor
public class SubscriptionPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    
    @Enumerated(EnumType.STRING)
    private SubBillingCycle billingCycle;
    
    private double price;
    private String feature;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
