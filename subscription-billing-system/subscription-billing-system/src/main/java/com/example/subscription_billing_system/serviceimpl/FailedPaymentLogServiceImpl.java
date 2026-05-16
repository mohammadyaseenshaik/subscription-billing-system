package com.example.subscription_billing_system.serviceimpl;

import com.example.subscription_billing_system.entity.FailedPaymentLog;
import com.example.subscription_billing_system.enums.FailedPaymentStatus;
import com.example.subscription_billing_system.repository.FailedPaymentLogRepository;
import com.example.subscription_billing_system.service.FailedPaymentLogService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FailedPaymentLogServiceImpl implements FailedPaymentLogService {

    private final FailedPaymentLogRepository failedPaymentLogRepository;

    public FailedPaymentLogServiceImpl(FailedPaymentLogRepository failedPaymentLogRepository) {
        this.failedPaymentLogRepository = failedPaymentLogRepository;
    }

    @Override
    public FailedPaymentLog createFailedPaymentLog(FailedPaymentLog failedPaymentLog) {
        failedPaymentLog.setStatus(FailedPaymentStatus.PENDING);
        failedPaymentLog.setRetryCount(0);
        return failedPaymentLogRepository.save(failedPaymentLog);
    }

    @Override
    public List<FailedPaymentLog> getAllFailedPayments() {
        return failedPaymentLogRepository.findAll();
    }

    @Override
    public List<FailedPaymentLog> getPendingRetries() {
        return failedPaymentLogRepository.findByStatus(FailedPaymentStatus.PENDING);
    }

    @Override
    public FailedPaymentLog updateRetryCount(Long id) {
        FailedPaymentLog log = failedPaymentLogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Failed Payment Log not found"));

        int retryCount = log.getRetryCount() + 1;
        log.setRetryCount(retryCount);

        if (retryCount >= 3) {
            log.setStatus(FailedPaymentStatus.WRITTEN_OFF);
        }

        log.setNextRetryDate(LocalDate.now().plusDays(1));

        return failedPaymentLogRepository.save(log);
    }
}
