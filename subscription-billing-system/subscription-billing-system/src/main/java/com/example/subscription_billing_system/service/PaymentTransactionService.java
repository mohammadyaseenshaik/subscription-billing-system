package com.example.subscription_billing_system.service;

import com.example.subscription_billing_system.entity.PaymentTransaction;

import java.util.List;

public interface PaymentTransactionService {

    PaymentTransaction createTransaction(PaymentTransaction transaction);

    List<PaymentTransaction> getAllTransactions();

    List<PaymentTransaction> getTransactionsByInvoice(Long invoiceId);

    PaymentTransaction updateTransactionStatus(Long transactionId, String status);
}
