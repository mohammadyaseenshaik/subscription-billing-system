package com.example.subscription_billing_system.mapper;

import com.example.subscription_billing_system.dto.request.SubscriptionPlanRequestDto;
import com.example.subscription_billing_system.dto.response.SubscriptionPlanResponse;
import com.example.subscription_billing_system.entity.SubscriptionPlan;

public class SubscriptionPlanMapper {

    public static SubscriptionPlan toEntity(SubscriptionPlanRequestDto dto) {
        if (dto == null) return null;
        SubscriptionPlan plan = new SubscriptionPlan();
        plan.setName(dto.getName());
        plan.setDescription(dto.getDescription());
        plan.setBillingCycle(dto.getBillingCycle());
        plan.setPrice(dto.getPrice());
        plan.setFeature(dto.getFeature());
        plan.setIsActive(dto.getIsActive());
        plan.setCreatedAt(dto.getCreatedAt());
        return plan;
    }

    public static SubscriptionPlanResponse toResponseDto(SubscriptionPlan entity) {
        if (entity == null) return null;
        SubscriptionPlanResponse dto = new SubscriptionPlanResponse();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setBillingCycle(entity.getBillingCycle());
        dto.setPrice(entity.getPrice());
        dto.setFeature(entity.getFeature());
        dto.setIsActive(entity.getIsActive());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
