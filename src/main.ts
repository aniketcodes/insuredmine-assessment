import 'dotenv/config'
import express from "express";
import ApiRoute from "./routes";
import connectDB from "./config/mongoose.config";
export class App {
  public constructor() {
    connectDB()
    this.bootstrap();
    this.apiRoutes();
    this.homeroute();
  }
  
  private app: express.Application = express();
  private PORT: number|string = process.env.PORT;

  public async bootstrap() {
    this.app.listen(this.PORT, () => {
        console.log("Server running", this.PORT);
    });
  }

  public async apiRoutes() {
    this.app.use("/api", ApiRoute);
  }

  public async homeroute() {
    this.app.get("/", (req, res) => {
      return res.send({
        status: 200,
        message: "Running on port",
      });
    });
  }
}

new App();
