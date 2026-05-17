package com.example.subscription_billing_system.service;

import com.example.subscription_billing_system.dto.request.FailedPaymentLogRequestDto;
import com.example.subscription_billing_system.dto.response.FailedPaymentLogResponseDto;
import java.util.List;

public interface FailedPaymentLogService {

    FailedPaymentLogResponseDto createFailedPaymentLog(FailedPaymentLogRequestDto failedPaymentLog);

    List<FailedPaymentLogResponseDto> getAllFailedPayments();

    List<FailedPaymentLogResponseDto> getPendingRetries();

    FailedPaymentLogResponseDto updateRetryCount(Long id);
}
