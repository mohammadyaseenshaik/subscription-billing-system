package com.example.subscription_billing_system.controller;

import com.example.subscription_billing_system.dto.request.InvoiceRequestDto;
import com.example.subscription_billing_system.dto.response.InvoiceResponseDto;
import com.example.subscription_billing_system.service.InvoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PostMapping
    public ResponseEntity<InvoiceResponseDto> createInvoice(@RequestBody InvoiceRequestDto invoiceRequestDto) {
        return ResponseEntity.ok(invoiceService.createInvoice(invoiceRequestDto));
    }

    @GetMapping
    public ResponseEntity<List<InvoiceResponseDto>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoiceResponseDto> getInvoiceById(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.getInvoiceById(id));
    }

    @GetMapping("/subscription/{subscriptionId}")
    public ResponseEntity<List<InvoiceResponseDto>> getInvoicesBySubscription(@PathVariable Long subscriptionId) {
        return ResponseEntity.ok(invoiceService.getInvoicesBySubscription(subscriptionId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<InvoiceResponseDto> updateInvoiceStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(invoiceService.updateInvoiceStatus(id, status));
    }
}
