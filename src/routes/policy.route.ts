import express from 'express';
import { PolicyController } from '../controller/policy.controller';

const PolicyRoute: express.Router = express.Router();
const controller: PolicyController = new PolicyController();

// Create a new policy
PolicyRoute.post('/create', controller.createPolicy);

// Get all policies
PolicyRoute.get('/all', controller.getAllPolicies);

// Get a single policy by ID
PolicyRoute.get('/:id', controller.getPolicyById);

// Update a policy by ID
PolicyRoute.patch('/:id', controller.updatePolicyById);

// Delete a policy by ID
PolicyRoute.delete('/:id', controller.deletePolicyById);

export default PolicyRoute;
