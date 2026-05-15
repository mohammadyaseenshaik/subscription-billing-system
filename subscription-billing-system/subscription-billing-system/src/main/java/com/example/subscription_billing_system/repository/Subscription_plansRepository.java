package com.example.subscription_billing_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.subscription_billing_system.entity.Subscription_plans;

public interface Subscription_plansRepository extends JpaRepository<Subscription_plans, Long> {

}
