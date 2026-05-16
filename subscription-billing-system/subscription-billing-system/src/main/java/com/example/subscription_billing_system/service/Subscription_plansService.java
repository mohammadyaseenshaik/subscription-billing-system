package com.example.subscription_billing_system.service;

import java.util.List;
import com.example.subscription_billing_system.dto.request.Subscription_plansRequestDto;
import com.example.subscription_billing_system.dto.response.Subscription_plansResponse;

public interface Subscription_plansService {   
    Subscription_plansResponse createPlan(Subscription_plansRequestDto subPlan);
    List<Subscription_plansResponse> getAllPlans();
    List<Subscription_plansResponse> getActivePlans();
    Subscription_plansResponse getPlanById(Long id);
    Subscription_plansResponse updatePlan(Long id, Subscription_plansRequestDto subPlan);
    void deletePlan(Long id);
}
