package com.example.subscription_billing_system.dto.request;

import com.example.subscription_billing_system.enums.InvoiceStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceRequestDto {
    private Long id;
    private Long subscriptionId;
    private long invoiceNumber;
    private InvoiceStatus status;
    private double amount;
    private LocalDate dueDate;
    private LocalDate paidDate;
    private String pdfUrl;
}
