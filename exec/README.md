# How to build & deploy SW Quality Board project

## 1. Setting

- NodeJS: 14.17.1
- Web Server: Nginx
- JVM: java-11-openjdk-amd64
- Gradle: 7.2
- WAS: Tomcat 9.0.33
- Frontend IDE: Visual Studio 1.60.2
- Backend IDE: Intellij Ultimate 2021.1
- MongoDB 5.0.3
- Docker: 20.10.7
- Docker-compose: 1.26.2

## 2. Setup Docker And Docker Compose

- Install Docker And Start

```
$ sudo apt-get update -y

$ sudo apt-get install docker.io -y

$ sudo service docker start
```

- Install Docker-compose

```
// Run this command to download the current stable release of Docker Compose
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

// Apply executable permissions to the binary
$ sudo chmod +x /usr/local/bin/docker-compose
```

## 3. Build
- git clone
```
$ git clone <https://lab.ssafy.com/s05-final/S05P31F003.git>
```

- backend

```
$ cd S05P31F003/backend

$ chmod +x gradlew

$ ./gradlew build
```

- frontend

```
$ cd S05P31F003/frontend

$ rm -rf package-lock.json node_modules

$ npm install

$ npm run build
```

## 4. Setup Docker Setting

- https setting

```
docker run -it --rm --name cert_tmp -p 80:80 -v /home/ubuntu/cert:/etc/letsencrypt certbot/certbot certonly \
--standalone -d {your server url} -m hibuz@hibuz.com
```

### Backend Setting
- Set up backend Dockerfile

```
$ cd S05P31F003/backend

$ sudo vi Dockerfile
```

- Dockerfile - backend

```
# Java runtime
FROM openjdk:11
# port
EXPOSE 8080
# location to save data
VOLUME {프로젝트가 있는 경로}/backend/build/libs
# find .jar file
ARG JAR_FILE=./swqualityboard-0.0.1-SNAPSHOT.jar
# Add jar file to the container
ADD ${JAR_FILE} swqualityboard-backend.jar
# command to run project
CMD java -jar swqualityboard-backend.jar --spring.data.mongodb.host="${YOUR_DATABASE_URL}" --spring.data.mongodb.port="${YOUR_DATABASE_PORT}" --spring.data.mongodb.database="${YOUR_DATABASE}" --spring.data.mongodb.username="${YOUR_DATABASE_USERNAME}" --spring.data.mongodb.password="${YOUR_DATABASE_PASSWORD}" --custom.constant.access.token.secret.key="${YOUR_ACCESS_TOKEN_SECRET_KEY}" --custom.constant.access.token.validity-in-seconds="${YOUR_ACCESS_TOKEN_VALIDITY_IN_SECONDS}"
```

### Frontend Setting

- Nginx Setting

```
$ cd S05P31F003

$ sudo mkdir nginx

$ cd nginx
// save default.conf
$ sudo vi default.conf
// save nginx.conf
$ sudo vi nginx.conf

```

- default.conf

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        location / {
                return 301 https://$host$request_uri;
        }
}


server {
        listen 443 ssl default_server;
        listen [::]:443 ssl default_server;

        ssl_certificate /etc/ssl/certs/fullchain.pem;
        ssl_certificate_key /etc/ssl/certs/privkey.pem;
        ssl_session_cache shared:le_nginx_SSL:10m;
        ssl_session_timeout 1440m;
        ssl_session_tickets off;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers off;
        ssl_ciphers "SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384";

        root /usr/share/nginx/html;
        index index.html index.htm;
        
        location / {
                try_files $uri $uri/ /index.html;
        }

        location /api {
                proxy_pass http://docker-nginx/api;
                proxy_redirect off;
                charset utf-8;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-NginX-Proxy true;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_http_version 1.1;
        }

}
```

- nginx.conf

```
user nginx;
worker_processes 1;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;
events {
        worker_connections 1024;
}
http {
        include /etc/nginx/mime.types;
        default_type application/octet-stream;
        upstream docker-nginx {
        server swqualityboard-api:8080;
        }
        log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                        '$status $body_bytes_sent "$http_referer" '
                        '"$http_user_agent" "$http_x_forwarded_for"';
        access_log /var/log/nginx/access.log main;
sendfile on;
keepalive_timeout 65;
include /etc/nginx/conf.d/*.conf;
}
```

### Docker-Compose Setting

- Set up docker-compose.yml

```
$ cd S05P31F003

$ sudo vi docker-compose.yml

```

- docker-compose.yml

```
version: "3"

services:
  cafein-api:
    build:
      context: ./backend
    ports:
      - 8080:8080
  swqualityboard-nginx:
    image: nginx
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
      - ./frontend/dist/spa:/usr/share/nginx/html
      - {fullchain.pem있는 디렉토리 경로}/fullchain.pem:/etc/ssl/certs/fullchain.pem
      - {privkey.pem있는 디렉토리 경로}/privkey.pem:/etc/ssl/certs/privkey.pem
    ports:
      - 80:80
      - 443:443
    links:
      - swqualityboard-api

```

### Docker-Compose start

```
$ cd S05P31F003

$ sudo docker-compose down

$ sudo docker system prune -af

$ sudo docker-compose up -d --build
```

### Set Up Jenkins Spring Batch Job

```
$ sudo docker run -itd -u root -p 9090:9090 -v /home/ubuntu/docker/dist:/var/jenkins_home/dist -e JENKINS_OPTS="--httpPort=9090" -e JAVA_OPTS="-Duser.timezone=Asia/Seoul -Dfile.encoding=UTF-8 -Dsun.jnu.encoding=UTF-8" --name=jenkins jenkins/jenkins:lts

```
- plugin add Build Timestamp Plugin
- system configuration setting enable BUILD_TIMESTAMP check
- Create Freestyle project in Jenkins
- Setting git Repository URL : ${YOUR_GIT_URL}
- Branch Specifier : */master
- Build periodically check
- Schedule : H * * * *
- Execute shell
```
cd batch
chmod +x gradlew
./gradlew assemble

cd build/libs
java -jar swqualityboardbatch-0.0.1-SNAPSHOT.jar --spring.datasource.hikari.driver-class-name="com.mysql.cj.jdbc.Driver" --spring.datasource.hikari.jdbc-url="{YOUR_MYSQL_DATABASE_URL}" --spring.datasource.hikari.username="${YOUR_MYSQL_DATABASE_USERNAME}" --spring.datasource.hikari.password="${YOUR_MYSQL_DATABASE_PASSWORD}" --spring.data.mongodb.host="${YOUR_MONGO_DATABASE}" --spring.data.mongodb.port="${YOUR_MONGO_DATABASE_PORT}" --spring.data.mongodb.database="${YOUR_MONGO_DATABASE_USERNAME}" --spring.data.mongodb.username="${YOUR_MONGO_DATABASE_USERNAME}" --spring.data.mongodb.password="${YOUR_MONGO_DATABASE_PASSWORD}" --spring.batch.job.names="job" version=${BUILD_NUMBER} requestDate=${BUILD_TIMESTAMP}


```
- apply and save

## 5. API - 링크의 html 파일 다운로드 후 열기

- [SWQualityBoard API](../backend/src/main/resources/static/docs/api-doc.html)

## 6. ERD Description

- [SWQualityBoard ERD](https://docs.google.com/spreadsheets/d/1g4YQfqu9_MgherBk5dLr-NoHycCmPqpspBtxpwq_22c/edit#gid=624760907)
