package com.example.subscription_billing_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.subscription_billing_system.entity.Subscription_plans;
import java.util.List;

public interface Subscription_plansRepository extends JpaRepository<Subscription_plans, Long> {

    List<Subscription_plans> findByIsActive(Boolean isActive);

}
