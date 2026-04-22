package com.erp.studenterp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.erp.studenterp.Entity.Student;
import com.erp.studenterp.Repository.StudentRepository;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class StudentController {

    @Autowired
    private StudentRepository repo;

    // ✅ LOGIN API (POST)
    @PostMapping("/login")
    public Student login(@RequestBody Student s) {
        Student student = repo.findByRollNoAndDob(s.getRollNo(), s.getDob());

        if (student == null) {
            throw new RuntimeException("Invalid Roll Number or DOB");
        }

        return student;
    }

    // ✅ REGISTER API
    @PostMapping("/register")
    public Student register(@RequestBody Student s) {
        return repo.save(s);
    }
}