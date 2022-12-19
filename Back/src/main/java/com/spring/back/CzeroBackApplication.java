package com.spring.back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
@EnableJpaAuditing	// 설명 : createdate를 사용하기 위한 설정
public class CzeroBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(CzeroBackApplication.class, args);
	}

}
