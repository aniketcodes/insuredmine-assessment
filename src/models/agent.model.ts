import { Agent } from '@base/interfaces/agent.interface';
import mongoose, { Schema, Document } from 'mongoose';

export interface AgentDocument extends Document, Agent {}

const agentSchema: Schema<AgentDocument> = new Schema<AgentDocument>({
  agent: { type: String, required: true },
  agency_id: { type: String, required: true },
});

const AgentModel = mongoose.model<AgentDocument>('Agent', agentSchema);

export default AgentModel;
