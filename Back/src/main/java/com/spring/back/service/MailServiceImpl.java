package com.spring.back.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.spring.back.content.ContentTemplate;
import com.spring.back.entity.Content;
import com.spring.back.entity.User;
import com.spring.back.repository.ContentRepository;
import com.spring.back.repository.UserRepository;

@Service
public class MailServiceImpl implements MailService {
	// Connection
	// --------------------------------------------------------------------------------------------------------------------------------
	// [JavaMailSender]
	@Autowired
	private JavaMailSender javaMailSender;

	// [Repository]
	@Autowired
	UserRepository userRepo;
   @Autowired
   ContentRepository contentRepo;

	// Default Value
	// --------------------------------------------------------------------------------------------------------------------------------
	// [전송해주는 이메일 주소]
	String setFrom = "jkj94627@gmail.com";

	// Send
	// --------------------------------------------------------------------------------------------------------------------------------
	// [컨탠츠 메일 발송]
	// 설명 : 해당 컨텐츠 고객 상태가 true인 고객을 대상으로 메일 발송
	// 특이사항 : 아직 컨텐츠 내용이 없어서 추후 메소드 수정 수정 후 확인 필요
	@Override
	@Transactional
	public boolean sendMail(Long first,Long second, Long third) {

		List<User> users = userRepo.findBySubStatus(true);
		Content content1=contentRepo.findByContentNo(first);
		content1.updateSendDate();
		Content content2=contentRepo.findByContentNo(second);
		content2.updateSendDate();
		Content content3=contentRepo.findByContentNo(third);
		content3.updateSendDate();
		List<String> toUserList = null;

		toUserList = users.stream().map(user -> user.getEmail()).collect(Collectors.toList());

		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper;
		try {
			helper = new MimeMessageHelper(message, true, "utf-8");
			helper.setFrom(setFrom);
			helper.setTo((String[]) toUserList.toArray(new String[toUserList.size()]));
			// 제목
			helper.setSubject("[Yellowbottle] "+LocalDate.now()+" 뉴스레터 입니다.");
			// 내용
			helper.setText(ContentTemplate.contentTemplate(content1,content2,content3), true);

			javaMailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		return true;
	}

	// [인증번호 메일 발송]
	// 설명 : 해당 컨텐츠 고객 상태가 true인 고객을 대상으로 메일 발송
	public void checkEmail(int checkNum, String email) {
		String title = "비밀번호를 찾기 위한 인증 이메일 입니다.";
		String content = "인증 번호는 " + checkNum + "입니다." + "<br>" + "해당 인증번호를 인증번호 확인란에 기입하여 주세요.";
		try {
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
			helper.setFrom(setFrom);
			helper.setTo(email);
			helper.setSubject(title);
			helper.setText(content, true);
			javaMailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	};

}