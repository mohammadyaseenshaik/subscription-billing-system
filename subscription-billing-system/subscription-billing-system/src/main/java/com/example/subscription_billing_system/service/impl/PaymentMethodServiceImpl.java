package com.example.subscription_billing_system.service.impl;

import com.example.subscription_billing_system.dto.request.PaymentMethodRequestDto;
import com.example.subscription_billing_system.dto.response.PaymentMethodResponseDto;
import com.example.subscription_billing_system.entity.PaymentMethod;
import com.example.subscription_billing_system.mapper.PaymentMethodMapper;
import com.example.subscription_billing_system.repository.PaymentMethodRepository;
import com.example.subscription_billing_system.service.PaymentMethodService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentMethodServiceImpl implements PaymentMethodService {

    private final PaymentMethodRepository paymentMethodRepository;

    @Override
    public PaymentMethodResponseDto savePaymentMethod(PaymentMethodRequestDto paymentMethod) {
        PaymentMethod p = PaymentMethodMapper.toEntity(paymentMethod);
        paymentMethodRepository.save(p);
        return PaymentMethodMapper.toResponseDto(p);

    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentMethodResponseDto> getAllPaymentMethods() {
        return paymentMethodRepository.findAll().stream()
        .map(PaymentMethodMapper::toResponseDto)
        .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentMethodResponseDto> getPaymentMethodsByCustomer(Long customerId) {
       return paymentMethodRepository.findByCustomerId(customerId).stream()
       .map(PaymentMethodMapper::toResponseDto)
       .collect(Collectors.toList());
    }

    @Override
    public PaymentMethodResponseDto setDefaultPaymentMethod(Long paymentMethodId) {
        PaymentMethod p = paymentMethodRepository.findById(paymentMethodId)
                .orElseThrow(() -> new RuntimeException("Payment Method not found"));

        // In a real system, you'd unset other default methods for the same customer
        p.setIsDefault(true);
        return PaymentMethodMapper.toResponseDto(p);
    }
}
