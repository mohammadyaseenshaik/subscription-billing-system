package com.example.subscription_billing_system.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "payment_transactions")
public class Payment_transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoices invoice;

    private long amount;
    private String payment_method;
    private String transaction_status;
    private String gateway_reference;
    private String failure_reason;
    private LocalDateTime created_at;
}
