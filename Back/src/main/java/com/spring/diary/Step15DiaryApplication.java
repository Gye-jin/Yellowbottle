package com.spring.diary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
// 리스너 작동을 위한 어노테이션
@EnableJpaAuditing
public class Step15DiaryApplication {

	public static void main(String[] args) {
		SpringApplication.run(Step15DiaryApplication.class, args);
	}

}
