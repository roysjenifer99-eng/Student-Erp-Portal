package com.erp.studenterp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.erp.studenterp.Entity.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

    Student findByRollNoAndDob(String rollNo, String dob);

}