package com.example.subscription_billing_system.service;

import com.example.subscription_billing_system.dto.request.PaymentTransactionRequestDto;
import com.example.subscription_billing_system.dto.response.PaymentTransactionResponseDto;

import java.util.List;

public interface PaymentTransactionService {

    PaymentTransactionResponseDto createTransaction(PaymentTransactionRequestDto transaction);

    List<PaymentTransactionResponseDto> getAllTransactions();

    List<PaymentTransactionResponseDto> getTransactionsByInvoice(Long invoiceId);

    PaymentTransactionResponseDto updateTransactionStatus(Long transactionId, String status);
}
