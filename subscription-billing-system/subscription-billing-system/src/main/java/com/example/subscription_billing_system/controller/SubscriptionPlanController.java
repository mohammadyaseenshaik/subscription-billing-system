package com.example.subscription_billing_system.controller;

import com.example.subscription_billing_system.dto.request.SubscriptionPlanRequestDto;
import com.example.subscription_billing_system.dto.response.SubscriptionPlanResponse;
import com.example.subscription_billing_system.service.SubscriptionPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscription-plans")
@RequiredArgsConstructor
public class SubscriptionPlanController {

    private final SubscriptionPlanService subscriptionPlanService;

    @PostMapping
    public ResponseEntity<SubscriptionPlanResponse> createPlan(@RequestBody SubscriptionPlanRequestDto plan) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subscriptionPlanService.createPlan(plan));
    }

    @GetMapping
    public ResponseEntity<List<SubscriptionPlanResponse>> getAllPlans() {
        return ResponseEntity.ok(subscriptionPlanService.getAllPlans());
    }

    @GetMapping("/active")
    public ResponseEntity<List<SubscriptionPlanResponse>> getActivePlans() {
        return ResponseEntity.ok(subscriptionPlanService.getActivePlans());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionPlanResponse> getPlanById(@PathVariable Long id) {
        return ResponseEntity.ok(subscriptionPlanService.getPlanById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubscriptionPlanResponse> updatePlan(@PathVariable Long id, @RequestBody SubscriptionPlanRequestDto plan) {
        return ResponseEntity.ok(subscriptionPlanService.updatePlan(id, plan));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        subscriptionPlanService.deletePlan(id);
        return ResponseEntity.noContent().build();
    }
}
