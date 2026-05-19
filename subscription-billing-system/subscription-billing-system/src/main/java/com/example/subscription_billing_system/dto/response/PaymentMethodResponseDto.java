package com.example.subscription_billing_system.dto.response;


import java.time.LocalDateTime;

import com.example.subscription_billing_system.enums.PaymentMethodType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentMethodResponseDto {

    private Long id;

    private Long customerId;

    private PaymentMethodType type;

    private String last4;

    private Boolean isDefault;

    private LocalDateTime createdAt;
}