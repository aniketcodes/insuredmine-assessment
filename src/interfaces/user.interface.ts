import { Document } from "mongoose";

export interface User {
    userType: string; 
    email: string; 
    gender: string; 
    firstname: string; 
    city: string; 
    phone: String; 
    address: string; 
    state: string; 
    zip: string; 
    dob: string; 
    primary: string; 
}