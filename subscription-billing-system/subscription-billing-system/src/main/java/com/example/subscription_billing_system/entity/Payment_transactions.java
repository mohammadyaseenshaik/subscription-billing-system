package com.example.subscription_billing_system.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
    private Long id;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Invoices invoice_id;
    private long amount;
    private String payment_method;
    private String transaction_status;
    private String gateway_reference;
    private String failure_reason;
    private LocalDateTime created_at;


}
