import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'


const Register = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, watch, } = useForm()
    const passwords = watch("password");
    console.log(passwords, "...")

    const onSubmit = (data) => {
        // store data in localStorage
        localStorage.setItem("registerData", JSON.stringify(data));
        console.log("Stored Data:", data);
        navigate('/login')
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Name</label>
                <input {...register("name", {


                    required: 'name is required',
                    maxLength: 20
                })} />
                {errors.name && <span>{errors.name.message}</span>}

                <br />

                <label>Email</label>

                <input
                    {...register('email', {
                        required: 'Email is required', // Required message
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Please enter a valid email address', // Pattern message
                        },
                    })}
                />
                {errors.email && <span>{errors.email.message}</span>} {/* Display error message */}
                <br />

                <label>Password</label>
                <input {...register("password", {
                    required: 'password is required',
                    minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                    },
                })} />
                {errors.password && <span>{errors.password.message}</span>}
                <br />

                <label>Confirm Password</label>
                <input {...register("cpassword", {
                    required: 'cpassword is required',

                    validate: (value) => {

                        return value === passwords || "password do not match"
                    }


                })} />
                {errors.cpassword && <span>{errors.cpassword.message}</span>}

                <br />

                <input type="submit" />
            </form>
        </div>
    )
}

export default Register