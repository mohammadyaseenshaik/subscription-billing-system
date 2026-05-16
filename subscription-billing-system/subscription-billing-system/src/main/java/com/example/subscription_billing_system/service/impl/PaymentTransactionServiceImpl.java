package com.example.subscription_billing_system.service.impl;

import com.example.subscription_billing_system.entity.PaymentTransaction;
import com.example.subscription_billing_system.enums.TransactionStatus;
import com.example.subscription_billing_system.repository.PaymentTransactionRepository;
import com.example.subscription_billing_system.service.PaymentTransactionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentTransactionServiceImpl implements PaymentTransactionService {

    private final PaymentTransactionRepository paymentTransactionRepository;

    public PaymentTransactionServiceImpl(PaymentTransactionRepository paymentTransactionRepository) {
        this.paymentTransactionRepository = paymentTransactionRepository;
    }

    @Override
    public PaymentTransaction createTransaction(PaymentTransaction transaction) {
        transaction.setTransactionStatus(TransactionStatus.INITIATED);
        return paymentTransactionRepository.save(transaction);
    }

    @Override
    public List<PaymentTransaction> getAllTransactions() {
        return paymentTransactionRepository.findAll();
    }

    @Override
    public List<PaymentTransaction> getTransactionsByInvoice(Long invoiceId) {
        return paymentTransactionRepository.findByInvoiceId(invoiceId);
    }

    @Override
    public PaymentTransaction updateTransactionStatus(Long transactionId, String status) {

        PaymentTransaction transaction = paymentTransactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setTransactionStatus(TransactionStatus.valueOf(status.toUpperCase()));

        return paymentTransactionRepository.save(transaction);
    }
}
