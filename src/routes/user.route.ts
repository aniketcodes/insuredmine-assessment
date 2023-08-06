import express from 'express';
import { UserController } from '../controller/user.controller';

const UserRoute: express.Router = express.Router();
const controller: UserController = new UserController();

// Create a new user
UserRoute.post('/create', controller.createUser);

// Get all users
UserRoute.get('/all', controller.getAllUsers);

// Get a single user by ID
UserRoute.get('/:id', controller.getUserById);

// Update a user by ID
UserRoute.patch('/:id', controller.updateUserById);

// Delete a user by ID
UserRoute.delete('/:id', controller.deleteUserById);

export default UserRoute;
