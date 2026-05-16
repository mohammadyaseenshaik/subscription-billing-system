package com.example.subscription_billing_system.service;

import com.example.subscription_billing_system.entity.Payment_methods;

import java.util.List;

public interface PaymentMethodService {

    Payment_methods savePaymentMethod(Payment_methods paymentMethod);

    List<Payment_methods> getAllPaymentMethods();

    List<Payment_methods> getPaymentMethodsByCustomer(Long customerId);

    Payment_methods setDefaultPaymentMethod(Long paymentMethodId);
}
