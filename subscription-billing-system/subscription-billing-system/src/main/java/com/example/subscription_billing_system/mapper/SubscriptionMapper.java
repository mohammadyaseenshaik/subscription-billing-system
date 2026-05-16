
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
        if (subscription.getSubscription_plan() != null) {
            dto.setPlanId(subscription.getSubscription_plan().getId());
            dto.setPlanName(subscription.getSubscription_plan().getName());
        }
        dto.setStatus(subscription.getStatus());
        dto.setStartDate(subscription.getStart_date());
        dto.setNextBillingDate(subscription.getNext_billing_date());
        dto.setCurrentPeriodStart(subscription.getCurrent_period_start());
        dto.setCurrentPeriodEnd(subscription.getCurrent_period_end());
        return dto;
    }

    public static Subscription toEntity(SubscriptionRequestDto dto) {
        if (dto == null) return null;

        Subscription subscription = new Subscription();
        subscription.setStatus(dto.getStatus());
        subscription.setStart_date(dto.getStartDate());
        subscription.setNext_billing_date(dto.getNextBillingDate());
        subscription.setCurrent_period_start(dto.getCurrentPeriodStart());
        subscription.setCurrent_period_end(dto.getCurrentPeriodEnd());
        return subscription;
    }
}
