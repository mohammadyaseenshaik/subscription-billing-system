package com.example.subscription_billing_system.controller;

import com.example.subscription_billing_system.dto.request.SubscriptionRequestDto;
import com.example.subscription_billing_system.dto.response.SubscriptionResponseDto;
import com.example.subscription_billing_system.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @PostMapping("/subscribe")
    public ResponseEntity<SubscriptionResponseDto> subscribeToPlan(@RequestBody SubscriptionRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subscriptionService.subscribeToPlan(request));
    }

    @GetMapping
    public ResponseEntity<List<SubscriptionResponseDto>> getAllSubscriptions() {
        return ResponseEntity.ok(subscriptionService.getAllSubscriptions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionResponseDto> getSubscriptionById(@PathVariable Long id) {
        return ResponseEntity.ok(subscriptionService.getSubscriptionById(id));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelSubscription(@PathVariable Long id) {
        subscriptionService.cancelSubscription(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/upgrade")
    public ResponseEntity<SubscriptionResponseDto> upgradeSubscription(@PathVariable Long id, @RequestParam Long newPlanId) {
        return ResponseEntity.ok(subscriptionService.upgradeSubscription(id, newPlanId));
    }

    @PutMapping("/{id}/downgrade")
    public ResponseEntity<SubscriptionResponseDto> downgradeSubscription(@PathVariable Long id, @RequestParam Long newPlanId) {
        return ResponseEntity.ok(subscriptionService.downgradeSubscription(id, newPlanId));
    }
}
