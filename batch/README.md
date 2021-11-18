# SW Quality board Batch Application

![Generic badge](https://img.shields.io/badge/java-v11.0.11-green.svg) ![Generic badge](https://img.shields.io/badge/mongodb-v5.0.3-yellow.svg) ![Generic badge](https://img.shields.io/badge/springboot-v2.3.0-blue.svg) ![Generic badge](https://img.shields.io/badge/Gradle-v7.2-red.svg) ![Generic badge](https://img.shields.io/badge/lombok-v1.18.12-orange.svg) ![Generic badge](https://img.shields.io/badge/springbatch-v4.3.3-purple.svg) ![Generic badge](https://img.shields.io/badge/mysql-v8.0.27-black.svg)

```
📦src
 ┣ 📂main
 ┃ ┗ 📂java
 ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┗ 📂display
 ┃ ┃ ┃ ┃ ┗ 📂swqualityboard
 ┃ ┃ ┃ ┃ ┃ ┣ 📂configuration
 ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┣ 📂dao
 ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┣ 📂job
 ┃ ┃ ┃ ┃ ┃ ┣ 📂listener
 ┃ ┃ ┃ ┃ ┃ ┣ 📂scheduler
 ┃ ┃ ┃ ┃ ┃ ┗ 📜SwqualityboardApplication.java
 ┃ ┗ 📂resources
 ┃ ┃ ┣ 📂data
 ┃ ┃ ┗ 📂static
 ┃ ┃ ┃
 ┗ 📂test
```

#### :star: You can change environment according to your setting

### Local Env

- Java 11
- MongoDB v5.0.3
- MYSQL 8.0.27
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
$ cd S05P31F003/batch
```

### 2. Setup application.yml

```
# src/main/resources/application.yml
spring:
  datasource:
    hikari:
      jdbc-url: ${YOUR_MYSQL_BATCH_DATABASE_URL}
      username: ${YOUR_MYSQL_BATCH_DATABASE_USERNAME}
      password: ${YOUR_MYSQL_BATCH_DATABASE_PASSWORD}
      driver-class-name: com.mysql.jdbc.Driver
  data:
    mongodb:
      host: ${YOUR_DATABASE_URL}
      port: ${YOUR_DATABASE_PORT}
      database: ${YOUR_DATABASE}
      username: ${YOUR_DATABASE_USERNAME}
      password: ${YOUR_DATABASE_PASSWORD}

```

### 3. Start Project
```
gradle build project

cd build/libs

java -jar swqualityboardbatch-0.0.1-SNAPSHOT.jar --spring.batch.job.names="job" requestDate=${CURRENT_TIME}

```
## ✔ Tech Stack

| Usage              | Stack                     |
| ------------------ | ------------------------- |
| `Spring Boot Batch`      | Spring Batch Framework         |
| `Spring Data MongoDB`  | Spring Data Project       |
| `MongoDB`          | Database                  |
| `MYSQL`            | Database                  |

## ✔ Project Structure

---

- `src/` 하위 폴더들은 다음과 같은 역할을 한다.
- `configuration/` : 프로젝트를 실행하기 위한 설정이 세팅되어 있다.
- `dao/` : DB에 실질적으로 접근하는 객체들이 행하는 기능들이 정의되어 있다.
- `dto/` : 계층간 데이터 교환을 위한 객체가 정의되어 있다.
- `entity/` : DB의 엔티티가 Spring Data MongoDB에 맞게 세팅되어 있다.
- `job/` : 배치처리 과정을 하나의 단위로 만들어 놓은 객체들이 있다.
- `scheduler/` : job에 대한 스케줄링이 정의되어있다. jenkins로 스케줄링을 관리하기때문에 사용하지 않는다.
- `resources/data/` : job에서 처리하는 json 데이터들이 정의 되어있다.
