import fs from 'fs';
import csvParser from 'csv-parser';


/**
 * Agent, User, User's Account, LOB, Carrier, Policy
 */

    interface PolicyData {
        agent: string; //Agent
        agency_id: string; // agent
        hasActiveClientPolicy: string; // agent
        policy_mode: number; // policy
        producer: string; //policy
        policy_number: string; // policy
        premium_amount_written: string; // policy
        premium_amount: number; //policy
        policy_type: string; // policy
        company_name: string; // policy
        category_name: string; // policy
        policy_start_date: string; // policy
        policy_end_date: string; // policy
        csr: string; // policy
        "Applicant ID": string; // user account
        account_name: string; // User Account
        account_type: string; // User Account
        userType: string; // user
        email: string; // user
        gender: string; // user
        firstname: string; // user
        city: string; // user
        phone: string; // user
        address: string; // user
        state: string; // user
        zip: string; // user
        dob: string; // user
        primary: string; // user
      }
      

async function readCsvFile(filePath: string): Promise<PolicyData[]> {
  return new Promise<PolicyData[]>((resolve, reject) => {
    const results: PolicyData[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data: PolicyData) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

export default readCsvFile;