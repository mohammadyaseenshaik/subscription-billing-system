package com.example.subscription_billing_system.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "payment_methods")
@Data
@AllArgsConstructor

public class Payment_methods {
    @Id
    private Long id;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer_id;
    private String type;
    private String last4;
    private Boolean is_default;;
    private LocalDateTime created_at;

    
}
