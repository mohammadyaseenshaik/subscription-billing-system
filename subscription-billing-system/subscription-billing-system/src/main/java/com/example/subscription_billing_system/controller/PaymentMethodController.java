package com.example.subscription_billing_system.controller;

import com.example.subscription_billing_system.dto.request.PaymentMethodRequestDto;
import com.example.subscription_billing_system.dto.response.PaymentMethodResponseDto;
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
    public ResponseEntity<PaymentMethodResponseDto> savePaymentMethod(@RequestBody PaymentMethodRequestDto paymentMethod) {
        return ResponseEntity.ok(paymentMethodService.savePaymentMethod(paymentMethod));
    }

    @GetMapping
    public ResponseEntity<List<PaymentMethodResponseDto>> getAllPaymentMethods() {
        return ResponseEntity.ok(paymentMethodService.getAllPaymentMethods());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<PaymentMethodResponseDto>> getPaymentMethodsByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(paymentMethodService.getPaymentMethodsByCustomer(customerId));
    }

    @PatchMapping("/{id}/default")
    public ResponseEntity<PaymentMethodResponseDto> setDefaultPaymentMethod(@PathVariable Long id) {
        return ResponseEntity.ok(paymentMethodService.setDefaultPaymentMethod(id));
    }
}
