package com.example.subscription_billing_system.service;

import com.example.subscription_billing_system.dto.request.PaymentMethodRequestDto;
import com.example.subscription_billing_system.dto.response.PaymentMethodResponseDto;

import java.util.List;

public interface PaymentMethodService {

    PaymentMethodResponseDto savePaymentMethod(PaymentMethodRequestDto paymentMethod);

    List<PaymentMethodResponseDto> getAllPaymentMethods();

    List<PaymentMethodResponseDto> getPaymentMethodsByCustomer(Long customerId);

    PaymentMethodResponseDto setDefaultPaymentMethod(Long paymentMethodId);
}
