import { NextFunction, Request, Response } from "express"
import { RequestHandler } from "express-serve-static-core"
import Joi from "joi"

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async function (req: Request, res: Response, next: NextFunction) {
        const validationOptions: Joi.AsyncValidationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        }

        try {
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            )
            req.body = value
            next()
        } catch (e: any) {
            const errors: string[] = []
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message)
            })
            res.status(400).send({ errors: errors })
        }
    }
}

export default validationMiddleware
