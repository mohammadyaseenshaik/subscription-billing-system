package com.example.subscription_billing_system.mapper;

import com.example.subscription_billing_system.dto.request.PaymentMethodRequestDto;
import com.example.subscription_billing_system.dto.response.PaymentMethodResponseDto;
import com.example.subscription_billing_system.entity.PaymentMethod;
import com.example.subscription_billing_system.enums.PaymentMethodType;

public class PaymentMethodMapper {
    public static PaymentMethodResponseDto toResponseDto(PaymentMethod method) {
        if (method == null) {
            return null;
        }
        PaymentMethodResponseDto dto = new PaymentMethodResponseDto();
        dto.setId(method.getId());
        if (method.getCustomer() != null) {
            dto.setCustomerId(method.getCustomer().getId());
        }
        dto.setType(method.getType());
        dto.setLast4(method.getLast4());
        dto.setIsDefault(method.getIsDefault());
        dto.setCreatedAt(method.getCreatedAt());
        return dto;
    }

    public static PaymentMethod toEntity(PaymentMethodRequestDto dto) {
        if (dto == null) {
            return null;
        }
        PaymentMethod method = new PaymentMethod();
        method.setId(dto.getId());
        if (dto.getType() != null) {
            method.setType(PaymentMethodType.valueOf(dto.getType()));
        }
        method.setLast4(dto.getLast4());
        method.setIsDefault(dto.getIsDefault());
        method.setCreatedAt(dto.getCreatedAt());
        return method;
    }
}
