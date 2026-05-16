package com.example.subscription_billing_system.controller;

import com.example.subscription_billing_system.entity.FailedPaymentLog;
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
    public ResponseEntity<FailedPaymentLog> createFailedPaymentLog(@RequestBody FailedPaymentLog failedPaymentLog) {
        return ResponseEntity.ok(failedPaymentLogService.createFailedPaymentLog(failedPaymentLog));
    }

    @GetMapping
    public ResponseEntity<List<FailedPaymentLog>> getAllFailedPayments() {
        return ResponseEntity.ok(failedPaymentLogService.getAllFailedPayments());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<FailedPaymentLog>> getPendingRetries() {
        return ResponseEntity.ok(failedPaymentLogService.getPendingRetries());
    }

    @PatchMapping("/{id}/retry")
    public ResponseEntity<FailedPaymentLog> updateRetryCount(@PathVariable Long id) {
        return ResponseEntity.ok(failedPaymentLogService.updateRetryCount(id));
    }
}
