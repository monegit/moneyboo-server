### .env 작성

```js
DB_HOST={MONGODB HOST}/moneyboo
JWT_SECRET={JWT SECRET KEY}

MAIL_USER={MAIL SERVICE USER ID}
MAIL_PASSWORD={MAIL SERVICE USER PASSWORD}
```

### 1. 메일 서버 설정하기

1. `src/api/mail/mail.service.ts` 이동
2. `constructor()`에서 `transporter` 수정 (기본 Gmail로 설정되어 있습니다.)
