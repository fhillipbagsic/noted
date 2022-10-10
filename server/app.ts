import express, { Application } from "express"
import mongoose from "mongoose"
import compression from "compression"
import cors from "cors"
import morgan from "morgan"
import Controller from "./utils/controller.interface"
import errorHandlerMiddleware from "./utils/errorHandler.middleware"

class App {
    public express: Application
    public port: number

    constructor(controllers: Controller[], port: number) {
        this.express = express()
        this.port = port

        this.initializeConnection()
        this.initializeMiddlewares()
        this.initializeControllers(controllers)
        this.initializeErrorHandling()
    }

    private async initializeConnection() {
        const connection = await mongoose.connect(
            "mongodb+srv://fhillipbgsc:may202000@cluster0.n5ci2.mongodb.net/Noted?retryWrites=true&w=majority",
            {}
        )
        console.log(connection.connection.host)
    }

    private initializeMiddlewares() {
        this.express.use(cors())
        this.express.use(morgan("dev"))
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: false }))
        this.express.use(compression())
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller: Controller) => {
            this.express.use("/api", controller.router)
        })
    }

    private initializeErrorHandling() {
        this.express.use(errorHandlerMiddleware)
    }

    public listen() {
        this.express.listen(this.port, () =>
            console.log(`App listening on port ${this.port}`)
        )
    }
}

export default App
