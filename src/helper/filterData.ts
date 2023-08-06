import { User } from "../interfaces/user.interface";
import { PolicyData } from "../interfaces/policyData.interface";
import { Policy } from "@base/interfaces/policy.interface";
import { UserAccount } from "@base/interfaces/userAccount.interface";
import { Agent } from "@base/interfaces/agent.interface";

export function filterUserData(data: PolicyData[]): User[] {
    return data?.map((el: PolicyData) =>
    pick(el, ['userType','email','gender','firstname','city','phone','address','state','zip','dob','primary'])
  ) ?? [];
}

export function filterPolicyData(data: PolicyData[]): Policy[] {
    return data?.map((el: PolicyData) =>
      pick(el, ['policy_end_date', 'policy_mode', 'producer', 'policy_number', 'premium_amount', 'category_name', 'company_name', 'csr', 'policy_start_date', 'policy_type', 'premium_amount_written'])
    ) ?? [];
  }

export function filterUserAccountData(data:PolicyData[]):UserAccount[] {
    return data?.map((el:PolicyData)=> pick(el,['Applicant ID','account_name','account_type']))
}

export function filterAgentData(data:PolicyData[]):Agent[] {
    return data?.map((el:PolicyData)=>pick(el,['agency_id','agent']))
}
  // Helper function to implement the Pick utility
  function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result: any = {};
    keys.forEach((key) => {
      result[key] = obj[key];
    });
    return result;
  }
  