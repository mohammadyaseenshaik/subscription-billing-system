package com.example.subscription_billing_system.service;

import com.example.subscription_billing_system.entity.PaymentMethod;

import java.util.List;

public interface PaymentMethodService {

    PaymentMethod savePaymentMethod(PaymentMethod paymentMethod);

    List<PaymentMethod> getAllPaymentMethods();

    List<PaymentMethod> getPaymentMethodsByCustomer(Long customerId);

    PaymentMethod setDefaultPaymentMethod(Long paymentMethodId);
}
