package com.example.subscription_billing_system.service.impl;

import com.example.subscription_billing_system.dto.request.LoginRequestDto;
import com.example.subscription_billing_system.dto.request.UserRequestDto;
import com.example.subscription_billing_system.dto.response.UserResponseDto;
import com.example.subscription_billing_system.entity.User;
import com.example.subscription_billing_system.mapper.UserMapper;
import com.example.subscription_billing_system.repository.UserRepository;
import com.example.subscription_billing_system.service.AuthService;
import com.example.subscription_billing_system.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final UserRepository userRepository;

    @Override
    public UserResponseDto register(UserRequestDto userRequestDto) {
        return userService.createUser(userRequestDto);
    }

    @Override
    public UserResponseDto login(LoginRequestDto loginRequestDto) {
        User user = userRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!user.getPassword().equals(loginRequestDto.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        UserResponseDto responseDto = UserMapper.toResponseDto(user);
        responseDto.setToken(UUID.randomUUID().toString()); // Dummy token
        return responseDto;
    }
}
