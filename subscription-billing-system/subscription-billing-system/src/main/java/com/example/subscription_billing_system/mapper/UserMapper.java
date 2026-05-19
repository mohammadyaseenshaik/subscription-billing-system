package com.example.subscription_billing_system.mapper;

import com.example.subscription_billing_system.dto.request.UserRequestDto;
import com.example.subscription_billing_system.dto.response.UserResponseDto;
import com.example.subscription_billing_system.entity.User;

public class UserMapper {
    public static UserResponseDto toResponseDto(User user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        return dto;
    }

    public static User toEntity(UserRequestDto userRequestDto) {
        User user = new User();
        user.setName(userRequestDto.getName());
        user.setEmail(userRequestDto.getEmail());
        user.setPassword(userRequestDto.getPassword());
        user.setRole(userRequestDto.getRole());
        return user;
    }
}