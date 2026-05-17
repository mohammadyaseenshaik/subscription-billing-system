package com.example.subscription_billing_system.dto.request;

import com.example.subscription_billing_system.enums.TransactionStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentTransactionRequestDto {
    private Long id;
    private Long invoiceId;
    private long amount;
    private String paymentMethod;
    private TransactionStatus transactionStatus;
    private String gatewayReference;
    private String failureReason;
    private LocalDateTime createdAt;
}
