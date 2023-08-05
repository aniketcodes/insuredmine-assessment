import express from 'express';
import { config } from 'dotenv';

export class App {
    public constructor(){
        config()
        this.bootstrap()
        this.homeroute()
        
    }

    private app:express.Application=express();
    private PORT:string=process.env.PORT;

    public async bootstrap(){
        this.app.listen(this.PORT,()=>{
            console.log("error in runing server at port")
        })
        console.log("Server running",process.env.PORT)
    }

    public async homeroute(){
        this.app.get('/',(req,res)=>{
            return res.send({
                status:200,
                message:"Running on port"
            })
        })
    }
}

new App()