package com.example.backend.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Table(name = "articles")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Article {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false, length = 1000)
	private String content;

	// S3 객체의 접근 URL
	// https://koho-bucket.s3.ap-northeast-2.amazonaws.com/%EC%A0%95%EA%B8%80%EC%BD%94%ED%98%B8.PNG
	@Column(nullable = true)
	private String imageUrl;

	// S3 객체의 키(식별자)
	// 버킷 내 객체 구분하기 위해 필요
	// 객체 사용에 활용되는 필드
	@Column(nullable = true)
	private String s3Key;

	// 업로드 파일의 원본 파일명
	// 화면 출력용
	@Column(nullable = true)
	private String originalFileName;

	@CreatedDate
	@Column(nullable = true, updatable = false)
	private LocalDateTime createdAt;

	@LastModifiedDate
	@Column(nullable = true)
	private LocalDateTime updatedAt;
}

