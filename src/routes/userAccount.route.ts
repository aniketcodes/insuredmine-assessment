import express from 'express';
import { UserAccountController } from '../controller/userAccount.controller';

const UserAccountRoute: express.Router = express.Router();
const controller: UserAccountController = new UserAccountController();

// Create a new user account
UserAccountRoute.post('/create', controller.createUserAccount);

// Get all user accounts
UserAccountRoute.get('/all', controller.getAllUserAccounts);

// Get a single user account by ID
UserAccountRoute.get('/:id', controller.getUserAccountById);

// Update a user account by ID
UserAccountRoute.patch('/:id', controller.updateUserAccountById);

// Delete a user account by ID
UserAccountRoute.delete('/:id', controller.deleteUserAccountById);

export default UserAccountRoute;
