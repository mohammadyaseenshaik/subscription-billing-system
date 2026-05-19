package com.example.subscription_billing_system.config;

import com.example.subscription_billing_system.entity.Invoice;
import com.example.subscription_billing_system.entity.Subscription;
import com.example.subscription_billing_system.entity.SubscriptionPlan;
import com.example.subscription_billing_system.entity.User;
import com.example.subscription_billing_system.enums.*;
import com.example.subscription_billing_system.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SubscriptionPlanRepository planRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final InvoiceRepository invoiceRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) return; // Skip if already seeded

        // --- Seed Subscription Plans ---
        SubscriptionPlan basic = new SubscriptionPlan();
        basic.setName("Basic");
        basic.setDescription("Perfect for individuals and small teams getting started.");
        basic.setBillingCycle(SubBillingCycle.MONTHLY);
        basic.setPrice(9.99);
        basic.setFeature("1 User,5GB Storage,Basic Analytics,Email Support");
        basic.setIsActive(true);
        basic.setCreatedAt(LocalDateTime.now());
        basic.setUpdatedAt(LocalDateTime.now());
        planRepository.save(basic);

        SubscriptionPlan premium = new SubscriptionPlan();
        premium.setName("Premium");
        premium.setDescription("Advanced features for growing businesses.");
        premium.setBillingCycle(SubBillingCycle.MONTHLY);
        premium.setPrice(29.99);
        premium.setFeature("10 Users,50GB Storage,Advanced Analytics,Priority Support,API Access");
        premium.setIsActive(true);
        premium.setCreatedAt(LocalDateTime.now());
        premium.setUpdatedAt(LocalDateTime.now());
        planRepository.save(premium);

        SubscriptionPlan enterprise = new SubscriptionPlan();
        enterprise.setName("Enterprise");
        enterprise.setDescription("Enterprise-grade power with custom integrations and dedicated support.");
        enterprise.setBillingCycle(SubBillingCycle.MONTHLY);
        enterprise.setPrice(99.99);
        enterprise.setFeature("Unlimited Users,500GB Storage,Custom Analytics,24/7 Support,API Access,Custom Integrations,SLA Guarantee");
        enterprise.setIsActive(true);
        enterprise.setCreatedAt(LocalDateTime.now());
        enterprise.setUpdatedAt(LocalDateTime.now());
        planRepository.save(enterprise);

        // --- Seed Users ---
        User adminUser = new User();
        adminUser.setName("John Doe");
        adminUser.setEmail("john.doe@example.com");
        adminUser.setPassword(passwordEncoder.encode("password123"));
        adminUser.setRole(UserRole.ADMIN);
        adminUser.setCreatedAt(LocalDateTime.now());
        adminUser.setUpdatedAt(LocalDateTime.now());
        userRepository.save(adminUser);

        User regularUser = new User();
        regularUser.setName("Jane Smith");
        regularUser.setEmail("jane.smith@example.com");
        regularUser.setPassword(passwordEncoder.encode("password123"));
        regularUser.setRole(UserRole.USER);
        regularUser.setCreatedAt(LocalDateTime.now());
        regularUser.setUpdatedAt(LocalDateTime.now());
        userRepository.save(regularUser);

        // --- Seed Subscription for John ---
        Subscription johnSub = new Subscription();
        johnSub.setUser(adminUser);
        johnSub.setSubscriptionPlan(premium);
        johnSub.setStatus(SubscriptionStatus.ACTIVE);
        johnSub.setStartDate(LocalDateTime.now().minusMonths(3));
        johnSub.setCurrentPeriodStart(LocalDateTime.now().minusDays(5));
        johnSub.setCurrentPeriodEnd(LocalDateTime.now().plusDays(25));
        johnSub.setNextBillingDate(LocalDateTime.now().plusDays(25));
        subscriptionRepository.save(johnSub);

        // --- Seed Invoices for John (3 paid + 1 pending) ---
        long invoiceNum = 1001L;
        for (int i = 3; i >= 1; i--) {
            Invoice invoice = new Invoice();
            invoice.setSubscription(johnSub);
            invoice.setInvoiceNumber(invoiceNum++);
            invoice.setAmount(29.99);
            invoice.setDueDate(LocalDate.now().minusMonths(i).plusDays(7));
            invoice.setPaidDate(LocalDate.now().minusMonths(i).plusDays(3));
            invoice.setStatus(InvoiceStatus.PAID);
            invoiceRepository.save(invoice);
        }

        // One pending invoice
        Invoice pendingInvoice = new Invoice();
        pendingInvoice.setSubscription(johnSub);
        pendingInvoice.setInvoiceNumber(invoiceNum);
        pendingInvoice.setAmount(29.99);
        pendingInvoice.setDueDate(LocalDate.now().plusDays(7));
        pendingInvoice.setStatus(InvoiceStatus.PENDING);
        invoiceRepository.save(pendingInvoice);

        System.out.println("=== SubSys DataSeeder: Seed data loaded successfully ===");
    }
}
