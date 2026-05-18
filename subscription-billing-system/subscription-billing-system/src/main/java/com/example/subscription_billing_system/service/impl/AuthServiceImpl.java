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

import com.example.subscription_billing_system.config.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Override
    public UserResponseDto register(UserRequestDto userRequestDto) {
        return userService.createUser(userRequestDto);
    }

    @Override
    public UserResponseDto login(LoginRequestDto loginRequestDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDto.getEmail(),
                        loginRequestDto.getPassword()
                )
        );

        User user = userRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found after authentication"));

        String jwtToken = jwtUtil.generateToken(user);
        UserResponseDto responseDto = UserMapper.toResponseDto(user);
        responseDto.setToken(jwtToken);
        return responseDto;
    }
}
