package com.example.subscription_billing_system.service.impl;

import com.example.subscription_billing_system.dto.request.FailedPaymentLogRequestDto;
import com.example.subscription_billing_system.dto.response.FailedPaymentLogResponseDto;
import com.example.subscription_billing_system.entity.FailedPaymentLog;
import com.example.subscription_billing_system.enums.FailedPaymentStatus;
import com.example.subscription_billing_system.mapper.FailedPaymentLogMapper;
import com.example.subscription_billing_system.repository.FailedPaymentLogRepository;
import com.example.subscription_billing_system.service.FailedPaymentLogService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FailedPaymentLogServiceImpl implements FailedPaymentLogService {

    private final FailedPaymentLogRepository failedPaymentLogRepository;

    public FailedPaymentLogServiceImpl(FailedPaymentLogRepository failedPaymentLogRepository) {
        this.failedPaymentLogRepository = failedPaymentLogRepository;
    }
@Override
public FailedPaymentLogResponseDto createFailedPaymentLog(FailedPaymentLogRequestDto failedPaymentLog) {

    FailedPaymentLog failed = FailedPaymentLogMapper.toEntity(failedPaymentLog);

    FailedPaymentLog saved = failedPaymentLogRepository.save(failed);

    return FailedPaymentLogMapper.toResponseDto(saved);
}

    @Override
    public List<FailedPaymentLogResponseDto> getAllFailedPayments() {
        return failedPaymentLogRepository.findAll().stream()
              .map(FailedPaymentLogMapper::toResponseDto)
              .collect(Collectors.toList());
    }

    @Override
    public List<FailedPaymentLogResponseDto> getPendingRetries() {
        return failedPaymentLogRepository.findByStatus(FailedPaymentStatus.PENDING).stream()
        .map(FailedPaymentLogMapper::toResponseDto)
        .collect(Collectors.toList());
    }

    @Override
    public FailedPaymentLogResponseDto updateRetryCount(Long id) {
        FailedPaymentLog log = failedPaymentLogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Failed Payment Log not found"));

        int retryCount = log.getRetryCount() + 1;
        log.setRetryCount(retryCount);

        if (retryCount >= 3) {
            log.setStatus(FailedPaymentStatus.WRITTEN_OFF);
        }

        log.setNextRetryDate(LocalDate.now().plusDays(1));

        return FailedPaymentLogMapper.toResponseDto(failedPaymentLogRepository.save(log));
    }
}
