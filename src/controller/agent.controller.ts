import AgentModel, { AgentDocument } from "../models/agent.model";
import { Request, Response } from "express";

export class AgentController {
  // Create a new agent
  async createAgent(req: Request, res: Response): Promise<void> {
    try {
      const { agent, agency_id } = req.body;
      const newAgent: AgentDocument = new AgentModel({ agent, agency_id });
      const savedAgent = await newAgent.save();
      res.status(201).json(savedAgent);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating agent", error: error.message });
    }
  }

  // Get all agents
  async getAllAgents(req: Request, res: Response): Promise<void> {
    try {
      const agents = await AgentModel.find();
      res.status(200).json(agents);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving agents", error: error.message });
    }
  }

  // Get a single agent by ID
  async getAgentById(req: Request, res: Response): Promise<Response> {
    try {
      const agentId = req.params.id;
      const agent = await AgentModel.findById(agentId);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.status(200).json(agent);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving agent", error: error.message });
    }
  }

  // Update an agent by ID
  async updateAgentById(req: Request, res: Response): Promise<Response> {
    try {
      const agentId = req.params.id;
      const { agent, agency_id } = req.body;

      const existingAgent = await AgentModel.findById(agentId);
      if (!existingAgent) {
        return res.status(404).json({ message: "Agent not found" });
      }

      existingAgent.agent = agent;
      existingAgent.agency_id = agency_id;
      const updatedAgent = await existingAgent.save();

      res.status(200).json(updatedAgent);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating agent", error: error.message });
    }
  }

  // Delete an agent by ID
  async deleteAgentById(req: Request, res: Response): Promise<Response> {
    try {
      const agentId = req.params.id;
      const deletedAgent = await AgentModel.findByIdAndDelete(agentId);

      if (!deletedAgent) {
        return res.status(404).json({ message: "Agent not found" });
      }

      res.status(200).json({ message: "Agent deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting agent", error: error.message });
    }
  }
}
