package com.example.subscription_billing_system.entity;
import java.time.LocalDateTime;
import com.example.subscription_billing_system.enums.*;
import lombok.*;
import jakarta.persistence.*;

@Data
@Entity
@Table(name="subscription")
@AllArgsConstructor
@NoArgsConstructor

public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "plan_id")
    private SubscriptionPlan subscriptionPlan;

    @Enumerated(EnumType.STRING)
    private SubscriptionStatus status;
    private LocalDateTime startDate;
    private LocalDateTime nextBillingDate;
    private LocalDateTime currentPeriodStart;
    private LocalDateTime currentPeriodEnd;
    
}
