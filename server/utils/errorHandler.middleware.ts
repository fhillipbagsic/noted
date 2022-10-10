import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import CustomError from "./errors/customError.error"

type Error = {
    message: string
    statusCode: number
}
const errorHandlerMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong, please try again later.",
    }

    return res.status(error.statusCode).send({ message: error.message })
}

export default errorHandlerMiddleware
