import { Request, Response } from 'express';
import PolicyModel, { PolicyDocument } from '../models/policy.model'; // Adjust the path to the policy.model.ts file

export class PolicyController {
    // Create a new policy
 async createPolicy(req: Request, res: Response): Promise<Response> {
    try {
      const newPolicy: PolicyDocument = new PolicyModel(req.body);
      const savedPolicy = await newPolicy.save();
      return res.status(201).json(savedPolicy);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating policy', error: error.message });
    }
  }
  
  // Get all policies
   async getAllPolicies(req: Request, res: Response): Promise<Response> {
    try {
      const policies = await PolicyModel.find();
      return res.status(200).json(policies);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving policies', error: error.message });
    }
  }
  
  // Get a single policy by ID
   async getPolicyById(req: Request, res: Response): Promise<Response> {
    try {
      const policyId = req.params.id;
      const policy = await PolicyModel.findById(policyId);
      if (!policy) {
        return res.status(404).json({ message: 'Policy not found' });
      }
      return res.status(200).json(policy);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving policy', error: error.message });
    }
  }
  
  // Update a policy by ID
   async updatePolicyById(req: Request, res: Response): Promise<Response> {
    try {
      const policyId = req.params.id;
      const updatedPolicy = await PolicyModel.findByIdAndUpdate(policyId, req.body, { new: true });
      if (!updatedPolicy) {
        return res.status(404).json({ message: 'Policy not found' });
      }
      return res.status(200).json(updatedPolicy);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating policy', error: error.message });
    }
  }
  
  // Delete a policy by ID
   async deletePolicyById(req: Request, res: Response): Promise<Response> {
    try {
      const policyId = req.params.id;
      const deletedPolicy = await PolicyModel.findByIdAndDelete(policyId);
  
      if (!deletedPolicy) {
        return res.status(404).json({ message: 'Policy not found' });
      }
  
      return res.status(200).json({ message: 'Policy deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting policy', error: error.message });
    }
  }
  
}