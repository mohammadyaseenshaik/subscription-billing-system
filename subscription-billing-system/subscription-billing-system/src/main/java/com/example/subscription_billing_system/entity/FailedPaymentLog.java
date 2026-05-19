package com.example.subscription_billing_system.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import com.example.subscription_billing_system.enums.FailedPaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "failed_payment_logs")
public class FailedPaymentLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "subscription_id")
    private Subscription subscription;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    private int retryCount;
    private LocalDate nextRetryDate;

    @Enumerated(EnumType.STRING)
    private FailedPaymentStatus status;

    private LocalDateTime resolvedAt;
}
