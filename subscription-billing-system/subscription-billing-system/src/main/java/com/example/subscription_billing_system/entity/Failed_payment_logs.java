package com.example.subscription_billing_system.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.concurrent.Flow.Subscription;


import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
    private Long id;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Subscription subscription_id;
    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoices invoice_id;
    private long retry_count;
    private LocalDate next_retry_date;
    private String status;
    private LocalDateTime resolved_at;

}
