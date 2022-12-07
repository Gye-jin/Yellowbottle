package com.spring.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.back.service.MailServiceImpl;

@RestController
@RequestMapping(value = "/api", produces = "application/json")
@CrossOrigin(origins = { "http://localhost:3000" })
public class AdminController {

	@Autowired
	MailServiceImpl mailservice;

	// 사람들에게 컨텐츠 전달 기능.
	@PostMapping("/mail")
	public boolean sendMail(Long contentNo) {

		return mailservice.sendMail(contentNo);

	}
}
