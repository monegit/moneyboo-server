// import { Injectable, NestMiddleware } from '@nestjs/common';
import { createHash } from 'crypto';
import { AccountSchema } from 'src/schema/account/account.schema';

AccountSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = createHash('sha256').update(this.password).digest('base64');
  }

  next();
});
// @Injectable()
// export class AccountMiddleware implements NestMiddleware {
//   use(req: any, res: any, next: () => void) {
//     next();
//   }
// }
