import express from "express";
import UploadRoute from "./upload";
import AgentRoute from "./agent.route";
import PolicyRoute from "./policy.route";
import UserRoute from "./user.route";
import UserAccountRoute from "./userAccount.route";
const ApiRoute:express.Router = express.Router();

ApiRoute.use('/upload',UploadRoute)
ApiRoute.use('/agents',AgentRoute)
ApiRoute.use('/policy',PolicyRoute)
ApiRoute.use('/user',UserRoute)
ApiRoute.use("/user-account",UserAccountRoute)
export default ApiRoute;