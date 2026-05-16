package com.example.subscription_billing_system.entity;

import java.time.LocalDate;
import com.example.subscription_billing_system.enums.InvoiceStatus;
import com.example.subscription_billing_system.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "invoices")
@AllArgsConstructor
@NoArgsConstructor
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "subscription_id", nullable = false)
    private Subscription subscription;

    private long invoice_number;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InvoiceStatus status;

    private double amount;
    private LocalDate due_date;
    private LocalDate paid_date;
    private String pdf_url;
    
    @Enumerated(EnumType.STRING)
    private UserRole role;
}
