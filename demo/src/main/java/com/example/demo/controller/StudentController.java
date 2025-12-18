package com.example.demo.controller;

import com.example.demo.repoistory.StudentRepository;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.example.demo.model.*;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {
	private final StudentRepository repository;
	private static final Logger log = LoggerFactory.getLogger(StudentController.class);

	public StudentController(StudentRepository repository) {
		this.repository = repository;
	}

	@GetMapping
	public List<Student> getAllStudents() {
		return repository.findAll();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Student createStudent(@RequestBody Student student) {
		log.info("createStudent payload: {}", student);
		return repository.save(student);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
		Optional<Student> optional = repository.findById(id);
		if (!optional.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		Student s = optional.get();
		log.info("updateStudent id={} payload={}", id, studentDetails);
		s.setName(studentDetails.getName());
		s.setEmail(studentDetails.getEmail());
		Student updated = repository.save(s);
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
		if (!repository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		repository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
