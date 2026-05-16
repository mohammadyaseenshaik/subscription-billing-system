package com.example.subscription_billing_system.controller;

import com.example.subscription_billing_system.entity.PaymentMethod;
import com.example.subscription_billing_system.service.PaymentMethodService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment-methods")
@RequiredArgsConstructor
public class PaymentMethodController {

    private final PaymentMethodService paymentMethodService;

    @PostMapping
    public ResponseEntity<PaymentMethod> savePaymentMethod(@RequestBody PaymentMethod paymentMethod) {
        return ResponseEntity.ok(paymentMethodService.savePaymentMethod(paymentMethod));
    }

    @GetMapping
    public ResponseEntity<List<PaymentMethod>> getAllPaymentMethods() {
        return ResponseEntity.ok(paymentMethodService.getAllPaymentMethods());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<PaymentMethod>> getPaymentMethodsByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(paymentMethodService.getPaymentMethodsByCustomer(customerId));
    }

    @PatchMapping("/{id}/default")
    public ResponseEntity<PaymentMethod> setDefaultPaymentMethod(@PathVariable Long id) {
        return ResponseEntity.ok(paymentMethodService.setDefaultPaymentMethod(id));
    }
}
