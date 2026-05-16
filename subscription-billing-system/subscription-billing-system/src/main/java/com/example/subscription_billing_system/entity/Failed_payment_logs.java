package com.example.subscription_billing_system.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "failed_payment_logs")
public class Failed_payment_logs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "subscription_id")
    private Subscription subscription;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoices invoice;

    private long retry_count;
    private LocalDate next_retry_date;
    private String status;
    private LocalDateTime resolved_at;
}
