import { Request, Response } from "express";
import UserModel, { UserDocument } from "../models/user.model"; // Adjust the path to the user.model.ts file

export class UserController {
  // Create a new user
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const newUser: UserDocument = new UserModel(req.body);
      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error creating user", error: error.message });
    }
  }

  // Get all users
  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserModel.find();
      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving users", error: error.message });
    }
  }

  // Get a single user by ID
  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving user", error: error.message });
    }
  }

  // Update a user by ID
  async updateUserById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating user", error: error.message });
    }
  }

  // Delete a user by ID
  async deleteUserById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      const deletedUser = await UserModel.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting user", error: error.message });
    }
  }
}
