package com.erp.studenterp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.erp.studenterp.Entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
