package com.example.subscription_billing_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.subscription_billing_system.entity.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

}
