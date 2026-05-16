package com.example.subscription_billing_system.service.impl;

import com.example.subscription_billing_system.entity.Payment_methods;
import com.example.subscription_billing_system.repository.PaymentMethodRepository;
import com.example.subscription_billing_system.service.PaymentMethodService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentMethodServiceImpl implements PaymentMethodService {

    private final PaymentMethodRepository paymentMethodRepository;

    public PaymentMethodServiceImpl(PaymentMethodRepository paymentMethodRepository) {
        this.paymentMethodRepository = paymentMethodRepository;
    }

    @Override
    public Payment_methods savePaymentMethod(Payment_methods paymentMethod) {
        return paymentMethodRepository.save(paymentMethod);
    }

    @Override
    public List<Payment_methods> getAllPaymentMethods() {
        return paymentMethodRepository.findAll();
    }

    @Override
    public List<Payment_methods> getPaymentMethodsByCustomer(Long customerId) {
        return paymentMethodRepository.findByCustomerId(customerId);
    }

    @Override
    public Payment_methods setDefaultPaymentMethod(Long paymentMethodId) {

        Payment_methods paymentMethod = paymentMethodRepository.findById(paymentMethodId)
                .orElseThrow(() -> new RuntimeException("Payment Method not found"));

        paymentMethod.setIsDefault(true);

        return paymentMethodRepository.save(paymentMethod);
    }
}
