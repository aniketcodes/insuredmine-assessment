import { AgentController } from "../controller/agent.controller";
import express from "express";

const AgentRoute:express.Router = express.Router();
const controller:AgentController = new AgentController();

// Create a new agent
AgentRoute.post('/create', controller.createAgent);

// Get all agents
AgentRoute.get('/all', controller.getAllAgents);

// Get a single agent by ID
AgentRoute.get('/:id', controller.getAgentById);

// Update an agent by ID
AgentRoute.patch('/:id', controller.updateAgentById);

// Delete an agent by ID
AgentRoute.delete('/:id', controller.deleteAgentById);

export default AgentRoute;
