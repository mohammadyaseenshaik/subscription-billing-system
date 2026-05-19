package com.example.subscription_billing_system.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.subscription_billing_system.service.UserService;
import com.example.subscription_billing_system.dto.response.UserResponseDto;
import com.example.subscription_billing_system.dto.request.UserRequestDto;
import java.util.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController{
    public final UserService userService;
    @PostMapping("/create")
    public ResponseEntity<UserResponseDto> createUser(@RequestBody UserRequestDto userRequestDto){
        return ResponseEntity.ok(userService.createUser(userRequestDto));
    }
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }
    @GetMapping("{id}")
    public ResponseEntity<UserResponseDto>getUserById(@PathVariable long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }
  
    @PutMapping("{id}")
    public ResponseEntity<UserResponseDto>updateUser(@PathVariable long id,
    @RequestBody UserRequestDto userRequestDto){
        return ResponseEntity.ok(userService.updateUser(id,userRequestDto));
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Void>deleteUser(@PathVariable long id){
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
