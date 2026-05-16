package com.example.subscription_billing_system.controller;

import com.example.subscription_billing_system.dto.request.Subscription_plansRequestDto;
import com.example.subscription_billing_system.dto.response.Subscription_plansResponse;
import com.example.subscription_billing_system.service.Subscription_plansService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subscription_plans")
@RequiredArgsConstructor
public class Subscription_plansController {

    private final Subscription_plansService subscription_plansService;

    @PostMapping
    public ResponseEntity<Subscription_plansResponse> createPlan(@RequestBody Subscription_plansRequestDto plan) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subscription_plansService.createPlan(plan));
    }

    @GetMapping
    public ResponseEntity<List<Subscription_plansResponse>> getAllPlans() {
        return ResponseEntity.ok(subscription_plansService.getAllPlans());
    }

    @GetMapping("/active")
    public ResponseEntity<List<Subscription_plansResponse>> getActivePlans() {
        return ResponseEntity.ok(subscription_plansService.getActivePlans());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subscription_plansResponse> getPlanById(@PathVariable Long id) {
        return ResponseEntity.ok(subscription_plansService.getPlanById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subscription_plansResponse> updatePlan(@PathVariable Long id, @RequestBody Subscription_plansRequestDto plan) {
        return ResponseEntity.ok(subscription_plansService.updatePlan(id, plan));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        subscription_plansService.deletePlan(id);
        return ResponseEntity.noContent().build();
    }
}
