# SW Quality board Backend

![Generic badge](https://img.shields.io/badge/java-v11.0.11-green.svg) ![Generic badge](https://img.shields.io/badge/mongodb-5.0.3-yellow.svg) ![Generic badge](https://img.shields.io/badge/springboot-v2.3.0-blue.svg) ![Generic badge](https://img.shields.io/badge/Gradle-v7.2-red.svg) ![Generic badge](https://img.shields.io/badge/lombok-v1.18.12-orange.svg)

```
📦src
 ┣ 📂docs
 ┃ ┗ 📂asciidoc
 ┃ ┃ ┗ 📜api-doc.adoc
 ┣ 📂main
 ┃ ┗ 📂java
 ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┗ 📂swqualityboard
 ┃ ┃ ┃ ┃ ┣ 📂configuration
 ┃ ┃ ┃ ┃ ┃ ┣ 📂annotation
 ┃ ┃ ┃ ┃ ┃ ┣ 📂jwt
 ┃ ┃ ┃ ┃ ┃ ┣ 📂security
 ┃ ┃ ┃ ┃ ┃ ┣ 📂util
 ┃ ┃ ┃ ┃ ┃ ┗ 📜ValidationCheck.java
 ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┣ 📂dao
 ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┃ ┃ ┣ 📂memo
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂create
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂update
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂updatereview
 ┃ ┃ ┃ ┃ ┃ ┣ 📂system
 ┃ ┃ ┃ ┃ ┃ ┣ 📂team 
 ┃ ┃ ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂select
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂signup
 ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┣ 📂memo
 ┃ ┃ ┃ ┃ ┃ ┣ 📂system
 ┃ ┃ ┃ ┃ ┃ ┣ 📂team
 ┃ ┃ ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┃ ┣ 📂response
 ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┣ 📜AuthService.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MemoService.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📜SystemService.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📜TeamService.java
 ┃ ┃ ┃ ┃ ┃ ┗ 📜UserService.java
 ┃ ┃ ┃ ┃ ┣ 📂serviceImpl
 ┃ ┃ ┃ ┃ ┃ ┣ 📜AuthServiceImpl.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📜MemoServiceImpl.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📜SystemServiceImpl.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📜TeamServiceImpl.java
 ┃ ┃ ┃ ┃ ┃ ┗ 📜UserServiceImpl.java
 ┃ ┃ ┃ ┃ ┗ 📜SwqualityboardApplication.java
 ┃ ┗ 📂resources
 ┃ ┃ ┗ 📂static
 ┃ ┃ ┃ ┗ 📂docs
 ┗ 📂test
 ┃ ┣ 📂java
 ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┗ 📂swqualityboard
 ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┣ 📜ApiDocumentUtils.java
 ┃ ┃ ┃ ┃ ┗ 📜TestConfig.java
 ┃ ┗ 📂resources
 ┃ ┃ ┗ 📂org
 ┃ ┃ ┃ ┗ 📂springframework
 ┃ ┃ ┃ ┃ ┗ 📂restdocs
 ┃ ┃ ┃ ┃ ┃ ┗ 📂templates
```

#### :star: You can change environment according to your setting

### Local Env

- Java 11
- MongoDB v5.0.3
- Intellij Ultimate 2021.2

### Server Env

- AWS EC2 (build & deploy server)

<br>

## ✔ How to start project in local environment

### 1. Clone this repository

```
// 레포지토리 클론
$ git clone <https://lab.ssafy.com/s05-final/S05P31F003.git>

// 경로 변경
$ cd S05P31F003/backend
```

### 2. Setup application.yml

```
# src/main/resources/application.yml
spring:
  data:
    mongodb:
      host: ${YOUR_DATABASE_URL}
      port: ${YOUR_DATABASE_PORT}
      database: ${YOUR_DATABASE}
      username: ${YOUR_DATABASE_USERNAME}
      password: ${YOUR_DATABASE_PASSWORD}

custom:
  constant:
    access:
      token:
        secret:
          key: ${YOUR_ACCESS_TOKEN_SECRET_KEY}
        validity-in-seconds: ${YOUR_ACCESS_TOKEN_VALIDITY_IN_SECONDS}
```

### 3. Start Project

> Right-click on the **src/main/java/com/swqualityboard/SwqualityboardApplication.java** - [Run 'SwqualityboardApplication.main()']

## ✔ Tech Stack

| Usage              | Stack                     |
| ------------------ | ------------------------- |
| `Spring Boot`      | Backend Framework         |
| `Spring Data MongoDB`  | Spring Data Project       |
| `Spring Security`  | Authentication Framework  |
| `MongoDB`          | Database                  |
| `JWT`              | JSON Web Token            |
| `Spring Rest Docs` | Document RESTful Services |

## ✔ Project Structure

---

- `src/` 하위 폴더들은 다음과 같은 역할을 한다.
- `configuration/` : 프로젝트를 실행하기 위한 설정이 세팅되어 있다.
- `controller/` : 클라이언트의 요청을 받아, 처리한 후 응답 데이터를 넘겨주는 역할을 한다.
- `dao/` : DB에 실질적으로 접근하는 객체들이 행하는 기능들이 정의되어 있다.
- `dto/` : 계층간 데이터 교환을 위한 객체가 정의되어 있다.
- `entity/` : DB의 엔티티가 Spring Data MongoDB에 맞게 세팅되어 있다.
- `response/` : 처리에 대한 응답 구조와 응답 리스트가 정의되어 있다.
- `service/` : 실질적으로 클라이언트의 요청을 처리하는 business logic이 정의되어 있다.
- `serviceImpl/` : service interface로부터 받은 business logic이 구현되어 있다.
- `docs/asciidoc/` : Document 생성 시 사용되는 .adoc가 정의되어있다.
- `main/resources/static/docs/` : Spring Rest Docs로 완성된 Document가 복사되는 곳이다.

---

- `test/controller` : Controller에 대한 단위 테스트를 진행한다. 테스트된 코드는 rest docs로 API 문서화 된다.
- `test/service` : Service에 대한 단위 테스트를 진행한다.

## ✔ cf) SW Quality Board ERD , API Document

1. ERD Document

- [Link](https://docs.google.com/spreadsheets/d/1g4YQfqu9_MgherBk5dLr-NoHycCmPqpspBtxpwq_22c/edit#gid=624760907)

2. API Document - 링크의 html 파일 다운로드 후 열기

- [Link](src/main/resources/static/docs/api-doc.html)
