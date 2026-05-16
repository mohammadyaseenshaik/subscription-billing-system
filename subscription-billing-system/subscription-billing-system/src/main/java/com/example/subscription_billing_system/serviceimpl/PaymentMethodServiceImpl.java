package com.example.subscription_billing_system.serviceimpl;

import com.example.subscription_billing_system.entity.PaymentMethod;
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
    public PaymentMethod savePaymentMethod(PaymentMethod paymentMethod) {
        return paymentMethodRepository.save(paymentMethod);
    }

    @Override
    public List<PaymentMethod> getAllPaymentMethods() {
        return paymentMethodRepository.findAll();
    }

    @Override
    public List<PaymentMethod> getPaymentMethodsByCustomer(Long customerId) {
        return paymentMethodRepository.findByCustomerId(customerId);
    }

    @Override
    public PaymentMethod setDefaultPaymentMethod(Long paymentMethodId) {

        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId)
                .orElseThrow(() -> new RuntimeException("Payment Method not found"));

        paymentMethod.setIsDefault(true);

        return paymentMethodRepository.save(paymentMethod);
    }
}
