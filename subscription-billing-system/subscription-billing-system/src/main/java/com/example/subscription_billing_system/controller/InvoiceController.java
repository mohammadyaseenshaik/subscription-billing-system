package com.example.subscription_billing_system.controller;

import com.example.subscription_billing_system.entity.Invoice;
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
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        return ResponseEntity.ok(invoiceService.createInvoice(invoice));
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
        return ResponseEntity.ok(invoiceService.getInvoiceById(id));
    }

    @GetMapping("/subscription/{subscriptionId}")
    public ResponseEntity<List<Invoice>> getInvoicesBySubscription(@PathVariable Long subscriptionId) {
        return ResponseEntity.ok(invoiceService.getInvoicesBySubscription(subscriptionId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Invoice> updateInvoiceStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(invoiceService.updateInvoiceStatus(id, status));
    }
}
