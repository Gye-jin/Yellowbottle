# Yellowbottle 프로젝트

제로웨이스트에 관심이 있는 사람들을 위한 의견 및 후기 공유 커뮤니티

## 프로젝트 기간

22.11.28일 ~ 22.12.23일


## 기능 소개
* 유저들은 제로웨이스트의 실천후기들을 인피니티 스크롤을 이용해서 확인을 할 수 있습니다. 
* 유저들은 제로웨이스트, 비건, 플로깅등과 같은 다양한 소식들을 이메일을 통해서 전달받을 수 있습니다.
* 유저들은 게시글마다 해당 게시글의 내용을 분석해서 해당 게시글과 유사한 추천게시글들을 확인을 할 수 있습니다.
* 유저들의 마이페이지에서 유저의 실천내역들을 토대로 레벨 상태들을 확인할 수 있습니다.
* 관리자는 관리자화면에서 유저들이 웹페이지에서 어떤 경향을 보내는지 태블로 대시보드를 통해 확인을 할 수 있습니다.

## 화면 미리보기

<details>
<summary>메인화면</summary>
<div>
<img src="./issue/메인화면.gif" width="800" height="400"/>

</div>
</details>

<details>
<summary>회원가입</summary>
<div>
<img src="./issue/회원가입.gif" width="800" height="400"/>

</div>
</details>

<details>
<summary>로그인</summary>
<div>
<img src="./issue/로그인.gif" width="800" height="400"/>

</div>
</details>

<details>
<summary>게시글 확인</summary>
<div>
<img src="./issue/게시글 확인.gif" width="800" height="400"/>

</div>
</details>

<details>
<summary>관리자 화면</summary>
<div>
<img src="./issue/관리자 화면.gif" width="800" height="400"/>

</div>
</details>

<details>
<summary>메일 발송</summary>
<div>
<img src="./issue/메일 발송.gif" width="800" height="400"/>

</div>
</details>

## 멤버구성

정계진: 백엔드, 서버배포  
박형규: 데이터 모델링, 데이터 시각화  
장우성: 프론트엔드, 백엔드  
이현지: 프론트엔드, CSS  
김민수: 데이터 모델링, 데이터 시각화  
박종서: 프론트엔드, CSS  

## 개발환경

Frontend - node: 18.12.0, npm: 8.19.2  
Backend - Springboot: 2.76, java: 1.8, Django: 4.14, Python: 3.8  
Modeling: LDA  
Visualization: GoogleAnalytics, Tableau   

### `사용기술`
<img src="./issue/사용기술.png" width="800" height="400"/>

### `ERD`
<img src="./issue/스키마.png" width="800" height="400"/>
  
  
### `아키텍쳐`



## 기능구현
1. User의 회원가입 CRUD 기능 구현  
2. 게시글의 CRUD 기능 구현  
3. 게시글 별 댓글의 CRUD 기능 구현  
4. 게시글 별 유사게시글 추천 서비스 구현  
5. 피드화면 구현 시 인피니티 스크롤 기능 구현  
6. 회원가입시 구독 알림을 한 고객들을 대상으로 메일 뉴스레터 발송 기능 구현  
7. 관리자로 로그인 시 유저별 행동 패턴 분석 대쉬보드 제공 기능 구현  

## 시연영상
https://youtu.be/_1zUNl3Th3Q  
  
## 추후 고려사항
<img src="./issue/고려사항.png" width="800" height="400"/>

