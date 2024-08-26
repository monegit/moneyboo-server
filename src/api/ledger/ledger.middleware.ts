import { isDateString } from 'class-validator';
import { LedgerSchema } from 'src/schema/ledger/ledger.schema';
import moment from 'moment';

LedgerSchema.pre('save', function (next) {
  if (!isDateString(this.date, { strict: true }))
    this.date = moment(this.date).format('YYYY-MM-DD');
  next();
});
