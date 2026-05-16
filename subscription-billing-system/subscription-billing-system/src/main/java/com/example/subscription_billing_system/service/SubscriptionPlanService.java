package com.example.subscription_billing_system.service;

import java.util.List;
import com.example.subscription_billing_system.dto.request.SubscriptionPlanRequestDto;
import com.example.subscription_billing_system.dto.response.SubscriptionPlanResponse;

public interface SubscriptionPlanService {   
    SubscriptionPlanResponse createPlan(SubscriptionPlanRequestDto subPlan);
    List<SubscriptionPlanResponse> getAllPlans();
    List<SubscriptionPlanResponse> getActivePlans();
    SubscriptionPlanResponse getPlanById(Long id);
    SubscriptionPlanResponse updatePlan(Long id, SubscriptionPlanRequestDto subPlan);
    void deletePlan(Long id);
}
