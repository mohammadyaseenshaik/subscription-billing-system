package com.example.subscription_billing_system.service.impl;

import com.example.subscription_billing_system.dto.request.SubscriptionRequestDto;
import com.example.subscription_billing_system.dto.response.SubscriptionResponseDto;
import com.example.subscription_billing_system.entity.Subscription;
import com.example.subscription_billing_system.entity.Subscription_plans;
import com.example.subscription_billing_system.entity.User;
import com.example.subscription_billing_system.enums.SubscriptionStatus;
import com.example.subscription_billing_system.mapper.SubscriptionMapper;
import com.example.subscription_billing_system.repository.SubscriptionRepository;
import com.example.subscription_billing_system.repository.Subscription_plansRepository;
import com.example.subscription_billing_system.repository.UserRepository;
import com.example.subscription_billing_system.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final Subscription_plansRepository planRepository;

    @Override
    public SubscriptionResponseDto subscribeToPlan(SubscriptionRequestDto request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Subscription_plans plan = planRepository.findById(request.getPlanId())
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setSubscription_plan(plan);
        subscription.setStatus(SubscriptionStatus.ACTIVE);
        subscription.setStart_date(LocalDateTime.now());
        subscription.setCurrent_period_start(LocalDateTime.now());
        
        // Basic logic for next billing date based on cycle
        LocalDateTime nextBilling;
        switch (plan.getBillingCycle()) {
            case MONTHLY -> nextBilling = LocalDateTime.now().plusMonths(1);
            case QUARTERLY -> nextBilling = LocalDateTime.now().plusMonths(3);
            case HALF_YEARLY -> nextBilling = LocalDateTime.now().plusMonths(6);
            case YEARLY -> nextBilling = LocalDateTime.now().plusYears(1);
            default -> nextBilling = LocalDateTime.now().plusMonths(1);
        }
        subscription.setNext_billing_date(nextBilling);
        subscription.setCurrent_period_end(nextBilling);

        Subscription savedSubscription = subscriptionRepository.save(subscription);
        return SubscriptionMapper.toResponseDto(savedSubscription);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SubscriptionResponseDto> getAllSubscriptions() {
        return subscriptionRepository.findAll().stream()
                .map(SubscriptionMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public SubscriptionResponseDto getSubscriptionById(Long id) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
        return SubscriptionMapper.toResponseDto(subscription);
    }

    @Override
    public void cancelSubscription(Long id) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
        subscription.setStatus(SubscriptionStatus.CANCELLED);
        subscriptionRepository.save(subscription);
    }

    @Override
    public SubscriptionResponseDto upgradeSubscription(Long id, Long newPlanId) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
        Subscription_plans newPlan = planRepository.findById(newPlanId)
                .orElseThrow(() -> new RuntimeException("New plan not found"));

        subscription.setSubscription_plan(newPlan);
        // In a real system, you might prorate the price or reset the billing cycle.
        // For now, we'll just update the plan.
        return SubscriptionMapper.toResponseDto(subscriptionRepository.save(subscription));
    }

    @Override
    public SubscriptionResponseDto downgradeSubscription(Long id, Long newPlanId) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));
        Subscription_plans newPlan = planRepository.findById(newPlanId)
                .orElseThrow(() -> new RuntimeException("New plan not found"));

        subscription.setSubscription_plan(newPlan);
        return SubscriptionMapper.toResponseDto(subscriptionRepository.save(subscription));
    }
}
