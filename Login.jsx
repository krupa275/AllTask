import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoginData } from './src/redux/slice';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, watch, } = useForm()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const res = await axios.post(
                "https://dummyjson.com/auth/login",
                {
                    username: data.userName,
                    password: data.password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }

            )
            dispatch(setLoginData(res?.data))
            navigate('/product')
            console.log(res?.data)
        } catch (error) {
            console.log("ERROR:", error.response?.data);
        }


    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>UserName</label>

                <input {...register("userName", {


                    required: 'userName is required',
                    maxLength: 20
                })} />
                {errors.userName && <span>{errors.userName.message}</span>}

                <br />
                <label>Password</label>

                <input {...register("password", {


                    required: 'password is required',
                    maxLength: 20
                })} />
                {errors.password && <span>{errors.password.message}</span>}

                <br />
                <input type="submit" />

            </form>
        </>
    )
}

export default Login