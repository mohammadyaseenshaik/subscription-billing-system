package com.example.subscription_billing_system.dto.request;
import com.example.subscription_billing_system.enums.*;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserRequestDto {
    private Long id;
    private String name;
    private String email;
    private String password;
    private UserRole role;
}
