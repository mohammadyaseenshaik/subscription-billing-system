package com.example.subscription_billing_system.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentMethodDTO {
    private Long id;
    private Long customerId;
    private String type;
    private String last4;
    private Boolean isDefault;
    private LocalDateTime createdAt;
}
