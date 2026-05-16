package com.example.subscription_billing_system.service.impl;

import com.example.subscription_billing_system.dto.request.SubscriptionPlanRequestDto;
import com.example.subscription_billing_system.dto.response.SubscriptionPlanResponse;
import com.example.subscription_billing_system.entity.SubscriptionPlan;
import com.example.subscription_billing_system.mapper.SubscriptionPlanMapper;
import com.example.subscription_billing_system.repository.SubscriptionPlanRepository;
import com.example.subscription_billing_system.service.SubscriptionPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SubscriptionPlanServiceImpl implements SubscriptionPlanService {

    private final SubscriptionPlanRepository subscriptionPlanRepository;

    @Override
    public SubscriptionPlanResponse createPlan(SubscriptionPlanRequestDto subPlan) {
        SubscriptionPlan plan = SubscriptionPlanMapper.toEntity(subPlan);

        if (plan.getIsActive() == null) {
            plan.setIsActive(true);
        }

        plan.setCreatedAt(LocalDateTime.now());
        plan.setUpdatedAt(LocalDateTime.now());

        SubscriptionPlan savedPlan = subscriptionPlanRepository.save(plan);
        return SubscriptionPlanMapper.toResponseDto(savedPlan);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SubscriptionPlanResponse> getAllPlans() {
        return subscriptionPlanRepository.findAll().stream()
                .map(SubscriptionPlanMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<SubscriptionPlanResponse> getActivePlans() {
        List<SubscriptionPlan> plans = subscriptionPlanRepository.findByIsActive(true);
        return plans.stream()
                .map(SubscriptionPlanMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public SubscriptionPlanResponse getPlanById(Long id) {
        SubscriptionPlan plan = subscriptionPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription plan not found with id: " + id));
        return SubscriptionPlanMapper.toResponseDto(plan);
    }

    @Override
    public SubscriptionPlanResponse updatePlan(Long id, SubscriptionPlanRequestDto subPlan) {
        SubscriptionPlan plan = subscriptionPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription plan not found with id: " + id));

        plan.setName(subPlan.getName());
        plan.setDescription(subPlan.getDescription());
        plan.setBillingCycle(subPlan.getBillingCycle());
        plan.setPrice(subPlan.getPrice());
        plan.setFeature(subPlan.getFeature());
        plan.setIsActive(subPlan.getIsActive());
        plan.setUpdatedAt(LocalDateTime.now());

        SubscriptionPlan savedPlan = subscriptionPlanRepository.save(plan);
        return SubscriptionPlanMapper.toResponseDto(savedPlan);
    }

    @Override
    public void deletePlan(Long id) {
        SubscriptionPlan plan = subscriptionPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription plan not found with id: " + id));

        plan.setIsActive(false);
        plan.setUpdatedAt(LocalDateTime.now());
        subscriptionPlanRepository.save(plan);
    }
}
