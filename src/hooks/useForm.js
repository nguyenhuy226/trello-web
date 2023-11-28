import { useState } from "react"
import { validate } from "../utils/Validate"

export const useForm = (rules) => {
    const [values, setForm] = useState({})
    const [errors, setError] = useState({})

    const _validate = () => {
        const errorObject = validate(rules, values)
        setError(errorObject)
        return (Object.keys(errorObject).length === 0)
    }

    const register = (name) => {
        return {
            error : errors[name],
            value :values[name] || '' ,
            onChange:(ev) => setForm({
                ...values, 
                [name]: ev.target.value
            })
        }
    }
    return {
        values,
        errors,
        register,
        validate : _validate
    }
}