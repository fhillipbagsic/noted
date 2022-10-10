import Joi from "joi"

const taskValidate = Joi.object({
    isCompleted: Joi.boolean().required(),
    task: Joi.string().required(),
    date: Joi.number().required(),
})

const rangeValidate = Joi.object({
    range: Joi.string(),
})

const updateValidate = Joi.object({
    _id: Joi.string().required(),
    status: Joi.boolean().required(),
})

export { taskValidate, rangeValidate, updateValidate }
