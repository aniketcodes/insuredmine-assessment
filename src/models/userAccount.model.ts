import { UserAccount } from '@base/interfaces/userAccount.interface';
import mongoose, { Schema, Document } from 'mongoose';

export interface UserAccountDocument extends Document, UserAccount {}

const userAccountSchema: Schema<UserAccountDocument> = new Schema<UserAccountDocument>({
  'Applicant ID': { type: String, required: true },
  account_name: { type: String, required: true },
  account_type: { type: String, required: true },
});

const UserAccountModel = mongoose.model<UserAccountDocument>('UserAccount', userAccountSchema);

export default UserAccountModel;
