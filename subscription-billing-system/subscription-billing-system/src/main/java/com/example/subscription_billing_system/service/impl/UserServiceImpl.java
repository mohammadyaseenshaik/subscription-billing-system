package com.example.subscription_billing_system.service.impl;

import com.example.subscription_billing_system.dto.request.UserRequestDto;
import com.example.subscription_billing_system.dto.response.UserResponseDto;
import com.example.subscription_billing_system.entity.User;
import com.example.subscription_billing_system.repository.UserRepository;
import com.example.subscription_billing_system.service.UserService;
import com.example.subscription_billing_system.mapper.UserMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;

   

    @Override
    public UserResponseDto createUser(UserRequestDto userRequestDto) {
        Optional<User> existingUser = userRepo.findByEmail(userRequestDto.getEmail());

        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = UserMapper.toEntity(userRequestDto);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        User savedUser = userRepo.save(user);

        return UserMapper.toResponseDto(savedUser);
    }

    @Override
    public List<UserResponseDto> getAllUsers() {
        return userRepo.findAll().stream()
                .map(UserMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDto getUserById(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return UserMapper.toResponseDto(user);
    }

    @Override
    public UserResponseDto getUserByEmail(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        return UserMapper.toResponseDto(user);
    }

    @Override
    public UserResponseDto updateUser(Long id, UserRequestDto userRequestDto) {
        User existingUser = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Check if the new email is already taken by a DIFFERENT user
        userRepo.findByEmail(userRequestDto.getEmail()).ifPresent(userWithEmail -> {
            if (!userWithEmail.getId().equals(id)) {
                throw new RuntimeException("Email is already in use by another user");
            }
        });

        existingUser.setName(userRequestDto.getName());
        existingUser.setEmail(userRequestDto.getEmail());
        existingUser.setRole(userRequestDto.getRole());
        existingUser.setUpdatedAt(LocalDateTime.now());

        User updatedUser = userRepo.save(existingUser);
        return UserMapper.toResponseDto(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepo.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepo.deleteById(id);
    }
}

