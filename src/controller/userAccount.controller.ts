import { Request, Response } from "express";
import UserAccountModel, {
  UserAccountDocument,
} from "../models/userAccount.model";

export class UserAccountController {
  // Create a new user account
  async createUserAccount(req: Request, res: Response): Promise<Response> {
    try {
      const newUserAccount: UserAccountDocument = new UserAccountModel(
        req.body
      );
      const savedUserAccount = await newUserAccount.save();
      return res.status(201).json(savedUserAccount);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error creating user account", error: error.message });
    }
  }

  // Get all user accounts
  async getAllUserAccounts(req: Request, res: Response): Promise<Response> {
    try {
      const userAccounts = await UserAccountModel.find();
      return res.status(200).json(userAccounts);
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Error retrieving user accounts",
          error: error.message,
        });
    }
  }

  // Get a single user account by ID
  async getUserAccountById(req: Request, res: Response): Promise<Response> {
    try {
      const userAccountId = req.params.id;
      const userAccount = await UserAccountModel.findById(userAccountId);
      if (!userAccount) {
        return res.status(404).json({ message: "User account not found" });
      }
      return res.status(200).json(userAccount);
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "Error retrieving user account",
          error: error.message,
        });
    }
  }

  // Update a user account by ID
  async updateUserAccountById(req: Request, res: Response): Promise<Response> {
    try {
      const userAccountId = req.params.id;
      const updatedUserAccount = await UserAccountModel.findByIdAndUpdate(
        userAccountId,
        req.body,
        { new: true }
      );
      if (!updatedUserAccount) {
        return res.status(404).json({ message: "User account not found" });
      }
      return res.status(200).json(updatedUserAccount);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating user account", error: error.message });
    }
  }

  // Delete a user account by ID
  async deleteUserAccountById(req: Request, res: Response): Promise<Response> {
    try {
      const userAccountId = req.params.id;
      const deletedUserAccount = await UserAccountModel.findByIdAndDelete(
        userAccountId
      );

      if (!deletedUserAccount) {
        return res.status(404).json({ message: "User account not found" });
      }

      return res
        .status(200)
        .json({ message: "User account deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting user account", error: error.message });
    }
  }
}
