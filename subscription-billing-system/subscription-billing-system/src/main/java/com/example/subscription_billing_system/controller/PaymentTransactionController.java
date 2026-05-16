package com.example.subscription_billing_system.controller;

import com.example.subscription_billing_system.entity.PaymentTransaction;
import com.example.subscription_billing_system.service.PaymentTransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class PaymentTransactionController {

    private final PaymentTransactionService paymentTransactionService;

    public PaymentTransactionController(PaymentTransactionService paymentTransactionService) {
        this.paymentTransactionService = paymentTransactionService;
    }

    @PostMapping
    public ResponseEntity<PaymentTransaction> createTransaction(@RequestBody PaymentTransaction transaction) {
        return ResponseEntity.ok(paymentTransactionService.createTransaction(transaction));
    }

    @GetMapping
    public ResponseEntity<List<PaymentTransaction>> getAllTransactions() {
        return ResponseEntity.ok(paymentTransactionService.getAllTransactions());
    }

    @GetMapping("/invoice/{invoiceId}")
    public ResponseEntity<List<PaymentTransaction>> getTransactionsByInvoice(@PathVariable Long invoiceId) {
        return ResponseEntity.ok(paymentTransactionService.getTransactionsByInvoice(invoiceId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<PaymentTransaction> updateTransactionStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(paymentTransactionService.updateTransactionStatus(id, status));
    }
}
