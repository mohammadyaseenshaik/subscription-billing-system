package com.example.subscription_billing_system.service;

import com.example.subscription_billing_system.entity.FailedPaymentLog;
import java.util.List;

public interface FailedPaymentLogService {

    FailedPaymentLog createFailedPaymentLog(FailedPaymentLog failedPaymentLog);

    List<FailedPaymentLog> getAllFailedPayments();

    List<FailedPaymentLog> getPendingRetries();

    FailedPaymentLog updateRetryCount(Long id);
}
