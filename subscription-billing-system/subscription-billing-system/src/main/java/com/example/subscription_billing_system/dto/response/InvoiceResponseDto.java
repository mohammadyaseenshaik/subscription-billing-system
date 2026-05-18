package com.example.subscription_billing_system.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;     

import com.example.subscription_billing_system.enums.InvoiceStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceResponseDto {

    private Long id;

    private long subscriptionId;

    private long invoiceNumber;

    private double amount;

    private InvoiceStatus status;

    private LocalDateTime dueDate;

    private LocalDateTime paidAt;

    private String pdfUrl;
}