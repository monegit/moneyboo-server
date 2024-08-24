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
  const a = this.getQuery();

  if (a['password']) a['password'] = hashPassword(a['password']);

  next();
});
// @Injectable()
// export class AccountMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     next();
//   }
// }
