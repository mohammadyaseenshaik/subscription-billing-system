package com.example.subscription_billing_system.service;

import com.example.subscription_billing_system.dto.request.SubscriptionRequestDto;
import com.example.subscription_billing_system.dto.response.SubscriptionResponseDto;
import java.util.List;

public interface SubscriptionService {
    SubscriptionResponseDto subscribeToPlan(SubscriptionRequestDto request);
    List<SubscriptionResponseDto> getAllSubscriptions();
    SubscriptionResponseDto getSubscriptionById(Long id);
    List<SubscriptionResponseDto> getSubscriptionsByUserId(Long userId);
    void cancelSubscription(Long id);
    SubscriptionResponseDto upgradeSubscription(Long id, Long newPlanId);
    SubscriptionResponseDto downgradeSubscription(Long id, Long newPlanId);
}
