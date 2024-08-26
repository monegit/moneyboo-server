// import { Injectable, NestMiddleware } from '@nestjs/common';
import { createHash } from 'crypto';
import { AccountSchema } from 'src/schema/account/account.schema';

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('base64');
}

AccountSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = hashPassword(this.password);
  }

  next();
});

AccountSchema.pre('findOne', function (next) {
  const query = this.getQuery();

  if (query['password']) query['password'] = hashPassword(query['password']);

  next();
});
