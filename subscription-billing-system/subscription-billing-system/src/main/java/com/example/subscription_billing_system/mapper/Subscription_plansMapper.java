package com.example.subscription_billing_system.mapper;
import com.example.subscription_billing_system.entity.Subscription_plans;
import com.example.subscription_billing_system.dto.request.Subscription_plansRequestDto;
import com.example.subscription_billing_system.dto.response.Subscription_plansResponse;
public class Subscription_plansMapper {
    //TOEntity
    public static Subscription_plans toEntity(Subscription_plansRequestDto subscription_plansRequestDto) {
        Subscription_plans subscription_plans = new Subscription_plans();
        subscription_plans.setName(subscription_plansRequestDto.getName());
        subscription_plans.setDescription(subscription_plansRequestDto.getDescription());
        subscription_plans.setBillingCycle(subscription_plansRequestDto.getBillingCycle());
        subscription_plans.setPrice(subscription_plansRequestDto.getPrice());
        subscription_plans.setFeature(subscription_plansRequestDto.getFeature());
        subscription_plans.setIsActive(subscription_plansRequestDto.getIsActive());
        subscription_plans.setCreatedAt(subscription_plansRequestDto.getCreatedAt());
        return subscription_plans;
    }

//TODto
 public static Subscription_plansResponse toResponseDto(Subscription_plans subscription_plans) {
    Subscription_plansResponse subscription_plansResponse = new Subscription_plansResponse();
    subscription_plansResponse.setId(subscription_plans.getId());
    subscription_plansResponse.setName(subscription_plans.getName());
    subscription_plansResponse.setDescription(subscription_plans.getDescription());
    subscription_plansResponse.setBillingCycle(subscription_plans.getBillingCycle());
    subscription_plansResponse.setPrice(subscription_plans.getPrice());
    subscription_plansResponse.setFeature(subscription_plans.getFeature());
    subscription_plansResponse.setIsActive(subscription_plans.getIsActive());
    subscription_plansResponse.setCreatedAt(subscription_plans.getCreatedAt());
    return subscription_plansResponse;
 }   
    
}
