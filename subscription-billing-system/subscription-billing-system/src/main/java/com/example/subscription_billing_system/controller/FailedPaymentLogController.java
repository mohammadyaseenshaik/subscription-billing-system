package com.example.subscription_billing_system.controller;

import com.example.subscription_billing_system.dto.request.FailedPaymentLogRequestDto;
import com.example.subscription_billing_system.dto.response.FailedPaymentLogResponseDto;
import com.example.subscription_billing_system.service.FailedPaymentLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/failed-payments")
public class FailedPaymentLogController {

    private final FailedPaymentLogService failedPaymentLogService;

    public FailedPaymentLogController(FailedPaymentLogService failedPaymentLogService) {
        this.failedPaymentLogService = failedPaymentLogService;
    }

    @PostMapping
    public ResponseEntity<FailedPaymentLogResponseDto> createFailedPaymentLog(@RequestBody FailedPaymentLogRequestDto failedPaymentLog) {
        return ResponseEntity.ok(failedPaymentLogService.createFailedPaymentLog(failedPaymentLog));
    }

    @GetMapping
    public ResponseEntity<List<FailedPaymentLogResponseDto>> getAllFailedPayments() {
        return ResponseEntity.ok(failedPaymentLogService.getAllFailedPayments());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<FailedPaymentLogResponseDto>> getPendingRetries() {
        return ResponseEntity.ok(failedPaymentLogService.getPendingRetries());
    }

    @PatchMapping("/{id}/retry")
    public ResponseEntity<FailedPaymentLogResponseDto> updateRetryCount(@PathVariable Long id) {
        return ResponseEntity.ok(failedPaymentLogService.updateRetryCount(id));
    }
}
