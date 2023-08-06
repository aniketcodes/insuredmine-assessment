import { Policy } from '@base/interfaces/policy.interface';
import mongoose, { Schema, Document } from 'mongoose';

export interface PolicyDocument extends Document, Policy {}

const policySchema: Schema<PolicyDocument> = new Schema<PolicyDocument>({
  policy_mode: { type: Number, required: true },
  producer: { type: String, required: true },
  policy_number: { type: String, required: true },
  premium_amount_written: { type: String, required: true },
  premium_amount: { type: Number, required: true },
  policy_type: { type: String, required: true },
  company_name: { type: String, required: true },
  category_name: { type: String, required: true },
  policy_start_date: { type: String, required: true },
  policy_end_date: { type: String, required: true },
  csr: { type: String, required: true },
});

const PolicyModel = mongoose.model<PolicyDocument>('Policy', policySchema);

export default PolicyModel;
