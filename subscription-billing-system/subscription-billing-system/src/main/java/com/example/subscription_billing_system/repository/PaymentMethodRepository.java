package com.example.subscription_billing_system.repository;

import com.example.subscription_billing_system.entity.Payment_methods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentMethodRepository extends JpaRepository<Payment_methods, Long> {
    List<Payment_methods> findByCustomerId(Long customerId);
}
