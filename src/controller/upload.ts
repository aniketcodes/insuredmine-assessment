import express, { Application, Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs'
import readCsvFile from '../helper/readFile';
import { filterAgentData, filterPolicyData, filterUserAccountData, filterUserData } from '../helper/filterData';
import { User } from '../interfaces/user.interface';
import { Policy } from '../interfaces/policy.interface';
import { Agent } from '../interfaces/agent.interface';
import { UserAccount } from '../interfaces/userAccount.interface';
import AgentModel from '../models/agent.model';
import bulkWriteDocuments from '../helper/bulkWrite';
import UserModel from '../models/user.model';
import UserAccountModel from '../models/userAccount.model';
import PolicyModel from '../models/policy.model';
// Define a separate class for Multer configuration
class MulterSetup {
  private storage: multer.StorageEngine;

  constructor() {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        // Specify the directory where files should be stored
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        // Generate a unique filename (you can customize this as per your requirements)
        cb(null, Date.now() + '-' + file.originalname);
      },
    });
  }

  public getUploader(): multer.Multer {
    return multer({ storage: this.storage });
  }
}

export class UploadController {
  private multerConfig: MulterSetup;

  constructor() {
    this.multerConfig = new MulterSetup();
  }

  async handleUpload(req: Request, res: Response): Promise<any> {
    try {
        console.log(req.file,req.files)
        const data = await readCsvFile(req?.file?.path)
        console.log({data})
        const users:User[] = filterUserData(data);
        const policies:Policy[] = filterPolicyData(data);
        const agents:Agent[] = filterAgentData(data);
        const userAccounts:UserAccount[] = filterUserAccountData(data);

        const bulkOps = agents.map(doc => ({
            updateOne: {
                filter: {agent: doc.agent},
                update: doc,
                upsert: true,
            }
        }))
        await bulkWriteDocuments(UserModel,users,'email')
        await bulkWriteDocuments(AgentModel,agents,'agency_id')
        await bulkWriteDocuments(UserAccountModel,userAccounts,'Applicant ID')
        await bulkWriteDocuments(PolicyModel,policies,'policy_number')
                
        return res.json({
          status: 200,
          message: 'File uploaded successfully!',
          agents,
          userAccounts,
          policies,
          users,
        });
     // });
    } catch (error) {
      console.error('Error in file upload:', error);
      return res.status(500).json({
        status: 500,
        message: 'Error in file upload.',
      });
    }
  }
}
