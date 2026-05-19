package com.example.subscription_billing_system.mapper;

import com.example.subscription_billing_system.dto.request.SubscriptionRequestDto;
import com.example.subscription_billing_system.dto.response.SubscriptionResponseDto;
import com.example.subscription_billing_system.entity.Subscription;

public class SubscriptionMapper {

    public static SubscriptionResponseDto toResponseDto(Subscription subscription) {
        if (subscription == null) return null;

        SubscriptionResponseDto dto = new SubscriptionResponseDto();
        dto.setId(subscription.getId());
        if (subscription.getUser() != null) {
            dto.setUserId(subscription.getUser().getId());
            dto.setUserName(subscription.getUser().getName());
        }
        if (subscription.getSubscriptionPlan() != null) {
            dto.setPlanId(subscription.getSubscriptionPlan().getId());
            dto.setPlanName(subscription.getSubscriptionPlan().getName());
            dto.setPrice(subscription.getSubscriptionPlan().getPrice());
        }
        dto.setStatus(subscription.getStatus());
        dto.setStartDate(subscription.getStartDate());
        dto.setNextBillingDate(subscription.getNextBillingDate());
        dto.setCurrentPeriodStart(subscription.getCurrentPeriodStart());
        dto.setCurrentPeriodEnd(subscription.getCurrentPeriodEnd());
        return dto;
    }

    public static Subscription toEntity(SubscriptionRequestDto dto) {
        if (dto == null) return null;

        Subscription subscription = new Subscription();
        subscription.setStatus(dto.getStatus());
        subscription.setStartDate(dto.getStartDate());
        subscription.setNextBillingDate(dto.getNextBillingDate());
        subscription.setCurrentPeriodStart(dto.getCurrentPeriodStart());
        subscription.setCurrentPeriodEnd(dto.getCurrentPeriodEnd());
        return subscription;
    }
}
