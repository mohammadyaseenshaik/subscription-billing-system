package com.example.subscription_billing_system.service.impl;

import com.example.subscription_billing_system.entity.PaymentMethod;
import com.example.subscription_billing_system.repository.PaymentMethodRepository;
import com.example.subscription_billing_system.service.PaymentMethodService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentMethodServiceImpl implements PaymentMethodService {

    private final PaymentMethodRepository paymentMethodRepository;

    @Override
    public PaymentMethod savePaymentMethod(PaymentMethod paymentMethod) {
        return paymentMethodRepository.save(paymentMethod);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentMethod> getAllPaymentMethods() {
        return paymentMethodRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentMethod> getPaymentMethodsByCustomer(Long customerId) {
        return paymentMethodRepository.findByCustomerId(customerId);
    }

    @Override
    public PaymentMethod setDefaultPaymentMethod(Long paymentMethodId) {
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId)
                .orElseThrow(() -> new RuntimeException("Payment Method not found"));

        // In a real system, you'd unset other default methods for the same customer
        paymentMethod.setIsDefault(true);
        return paymentMethodRepository.save(paymentMethod);
    }
}
