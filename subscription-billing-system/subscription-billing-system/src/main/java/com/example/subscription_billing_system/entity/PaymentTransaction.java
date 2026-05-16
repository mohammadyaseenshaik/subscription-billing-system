package com.example.subscription_billing_system.entity;

import java.time.LocalDateTime;
import com.example.subscription_billing_system.enums.TransactionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "payment_transactions")
public class PaymentTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    private long amount;
    private String payment_method;
    @Enumerated(EnumType.STRING)
    private TransactionStatus transactionStatus;
    private String gateway_reference;
    private String failure_reason;
    private LocalDateTime created_at;
}
