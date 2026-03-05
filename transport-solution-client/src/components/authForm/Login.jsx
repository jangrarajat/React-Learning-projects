import React, { useContext, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import SuccessToster from '../toster/SuccessToster';
import axios from 'axios';
import ButtonLoaders from '../loaders/ButtonLoaders';
import { useNavigate } from "react-router-dom";

function Login({ setAuthForm }) {

    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loding, setLoading] = useState(false)
    const [toast, setToast] = useState({
        id: Date.now(),
        show: false,
        success: true,
        message: ""
    });


    const loginApi = async () => {

        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_URL}/user/login`, { email, password }, {
                withCredentials: true  
            })
            console.log(response.data.responseUser)
            setUser(response.data.responseUser)
            localStorage.setItem("transportUser", JSON.stringify(response.data.responseUser))
            setToast({
                id: Date.now(),
                show: true,
                success: true,
                message: "login Successful 🚛"
            });

            if (response.data.success) {
                setTimeout(() => {
                    navigate("/");
                }, 2000)

            }

        } catch (error) {
            setToast({
                id: Date.now(),
                show: true,
                success: false,
                message: error.response?.data?.message || "Something went wrong"
            });
            console.log(error)

        } finally {
            setLoading(false)

        }
    };

    return (
        <div className='w-96 min-h-64 bg-black/60 flex flex-col items-center text-white font-thin p-2 rounded-md backdrop:blur-md'>
            {
                toast.show && (
                    <SuccessToster key={toast.id} success={toast.success} msg={toast.message} />
                )
            }

            <h1 className=' uppercase text-3xl'>Login</h1>
            <div className='w-full h-full flex flex-col p-2 pb-5'>


                <label htmlFor="email" className='px-2 mt-4'>Email</label>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name='email' id='email' placeholder='email' className=' bg-black/60 px-2 p-2 rounded-md  backdrop:blur-sm' />
                <label htmlFor="password" className='px-2 mt-4'>Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name='password' id='password' placeholder='password' className=' bg-black/60 px-2 p-2 rounded-md  backdrop:blur-sm' />

            </div>

            <button
                className='my-3 cursor-pointer hover:underline'
                onClick={() => setAuthForm("registration")}
            >don't have account</button>
            <button
                onClick={loginApi}
                className=' flex  justify-center items-center p-2 bg-blue-500 w-[90%] rounded-md '>

                {loding ? (<ButtonLoaders />) : "Login"}
            </button>

        </div>
    )
}

export default Login
