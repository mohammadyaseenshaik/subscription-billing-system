package com.example.subscription_billing_system.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

import com.example.subscription_billing_system.enums.UserRole;

@Data
public class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private String token;
    private UserRole role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
