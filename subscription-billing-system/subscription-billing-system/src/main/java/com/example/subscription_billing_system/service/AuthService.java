package com.example.subscription_billing_system.service;

import com.example.subscription_billing_system.dto.request.LoginRequestDto;
import com.example.subscription_billing_system.dto.request.UserRequestDto;
import com.example.subscription_billing_system.dto.response.UserResponseDto;

public interface AuthService {
    UserResponseDto register(UserRequestDto userRequestDto);
    UserResponseDto login(LoginRequestDto loginRequestDto);
}
