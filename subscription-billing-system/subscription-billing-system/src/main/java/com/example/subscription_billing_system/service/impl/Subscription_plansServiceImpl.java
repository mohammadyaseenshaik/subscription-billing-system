package com.example.subscription_billing_system.service.impl;

import com.example.subscription_billing_system.dto.request.Subscription_plansRequestDto;
import com.example.subscription_billing_system.dto.response.Subscription_plansResponse;
import com.example.subscription_billing_system.entity.Subscription_plans;
import com.example.subscription_billing_system.mapper.Subscription_plansMapper;
import com.example.subscription_billing_system.repository.Subscription_plansRepository;
import com.example.subscription_billing_system.service.Subscription_plansService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class Subscription_plansServiceImpl implements Subscription_plansService {

    private final Subscription_plansRepository subscription_plansRepository;

    @Override
    public Subscription_plansResponse createPlan(Subscription_plansRequestDto subPlan) {
        Subscription_plans subscription_plans = Subscription_plansMapper.toEntity(subPlan);

        if (subscription_plans.getIsActive() == null) {
            subscription_plans.setIsActive(true);
        }

        subscription_plans.setCreatedAt(LocalDateTime.now());
        subscription_plans.setUpdatedAt(LocalDateTime.now());

        Subscription_plans savedPlan = subscription_plansRepository.save(subscription_plans);
        return Subscription_plansMapper.toResponseDto(savedPlan);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Subscription_plansResponse> getAllPlans() {
        return subscription_plansRepository.findAll().stream()
                .map(Subscription_plansMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Subscription_plansResponse> getActivePlans() {
        List<Subscription_plans> plans = subscription_plansRepository.findByIsActive(true);
        return plans.stream()
                .map(Subscription_plansMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Subscription_plansResponse getPlanById(Long id) {
        Subscription_plans plan = subscription_plansRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription plan not found with id: " + id));
        return Subscription_plansMapper.toResponseDto(plan);
    }

    @Override
    public Subscription_plansResponse updatePlan(Long id, Subscription_plansRequestDto subPlan) {
        Subscription_plans plan = subscription_plansRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription plan not found with id: " + id));

        plan.setName(subPlan.getName());
        plan.setDescription(subPlan.getDescription());
        plan.setBillingCycle(subPlan.getBillingCycle());
        plan.setPrice(subPlan.getPrice());
        plan.setFeature(subPlan.getFeature());
        plan.setIsActive(subPlan.getIsActive());
        plan.setUpdatedAt(LocalDateTime.now());

        Subscription_plans savedPlan = subscription_plansRepository.save(plan);
        return Subscription_plansMapper.toResponseDto(savedPlan);
    }

    @Override
    public void deletePlan(Long id) {
        Subscription_plans plan = subscription_plansRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription plan not found with id: " + id));

        plan.setIsActive(false);
        plan.setUpdatedAt(LocalDateTime.now());
        subscription_plansRepository.save(plan);
    }
}
