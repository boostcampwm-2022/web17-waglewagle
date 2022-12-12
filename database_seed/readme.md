1. 의존 라이브러리

- typeorm
- @faker-js/faker
- dotenv

2. 사용 언어

- typescript

3. 실행 방법

- .env 파일 생성
  ```text
    DB_HOST={{ DB 서버 호스트 }}
    DB_PORT={{ DB 서버 접속 포트 }}
    DB_USERNAME={{ DB 계정 username }}
    DB_PASSWORD={{ DB 계정 password }}
    DB_SCHEME={{ 사용 DB scheme }}
  ```
- 명령어 입력
  ```bash
    npm run seed
  ```
