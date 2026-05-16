package com.example.subscription_billing_system.entity;

import java.time.LocalDate;
import java.util.concurrent.Flow.Subscription;

import org.springframework.data.annotation.Id;

import com.example.subscription_billing_system.enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Entity
@Table(name = "invoices")
@AllArgsConstructor
@NoArgsConstructor
public class Invoices {
@Id
private int id;
@Column(nullable = false,name = "subscription_id")
@ManyToOne
private Subscription subscription_id;
private long invoice_number;
@Column(nullable = false)
private String status;
private double amount;
private LocalDate due_date;
private LocalDate paid_date;
private String pdf_url;
private UserRole role;
}
