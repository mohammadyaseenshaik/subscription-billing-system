package com.example.subscription_billing_system.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.subscription_billing_system.enums.PaymentMethodType;
import com.example.subscription_billing_system.enums.TransactionStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentTransactionResponseDto {

    private Long id;

    private Long invoiceId;

    private BigDecimal amount;

    private PaymentMethodType paymentMethod;

    private TransactionStatus transactionStatus;

    private String gatewayReference;

    private String failureReason;

    private LocalDateTime createdAt;
}