package com.example.subscription_billing_system.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.example.subscription_billing_system.enums.*;


@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(nullable = false)
private String name;
@Column(nullable = false)
private String email;
@Enumerated(EnumType.STRING)
@Column(nullable = false)
private UserRole role;
private LocalDateTime createdAt;
private LocalDateTime updatedAt;

}
