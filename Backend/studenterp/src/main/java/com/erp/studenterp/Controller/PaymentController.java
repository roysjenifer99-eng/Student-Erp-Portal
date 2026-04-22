package com.erp.studenterp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.erp.studenterp.Entity.Payment;
import com.erp.studenterp.Repository.PaymentRepository;

@RestController
@CrossOrigin
@RequestMapping("/api")  // IMPORTANT (clean URL)
public class PaymentController {

    @Autowired
    private PaymentRepository repo;

    @PostMapping("/pay")
    public Payment pay(@RequestBody Payment p) {
        p.setStatus("SUCCESS");
        return repo.save(p);
    }

    @GetMapping("/bill/{id}")
    public Payment getBill(@PathVariable int id) {
        return repo.findById(id).orElse(null);
    }
}