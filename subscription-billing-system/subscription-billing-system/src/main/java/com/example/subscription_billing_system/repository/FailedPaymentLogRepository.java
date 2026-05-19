package com.example.subscription_billing_system.repository;

import com.example.subscription_billing_system.entity.FailedPaymentLog;
import com.example.subscription_billing_system.enums.FailedPaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FailedPaymentLogRepository extends JpaRepository<FailedPaymentLog, Long> {
    List<FailedPaymentLog> findByInvoiceId(Long invoiceId);
    List<FailedPaymentLog> findByStatus(FailedPaymentStatus status);
}
