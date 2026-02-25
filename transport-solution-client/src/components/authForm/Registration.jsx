import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import SuccessToster from '../toster/SuccessToster';
import axios from 'axios';
import ButtonLoaders from '../loaders/ButtonLoaders';

function Registration({ setAuthForm }) {

    const { } = useAuth();
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [loading, setLoading] = useState(false)

    const [toast, setToast] = useState({
        id: Date.now(),
        show: false,
        success: true,
        message: ""
    });



    const registrationApi = async () => {

        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_URL}/user/registration`, { name, number, email, password, companyName })
            console.log(response)
            setToast({
                id: Date.now(),
                show: true,
                success: true,
                message: "Registration Successful 🚛"
            });
            if (response.data.success) {
                setTimeout(() => {
                    setAuthForm("login")
                }, 3000)
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







    return (<>
        {
            toast.show && (
                <SuccessToster key={toast.id} success={toast.success} msg={toast.message} />
            )
        }
        < div className='  w-96 min-h-64 bg-black/60 flex flex-col items-center text-white font-thin p-2 rounded-md backdrop:blur-md' >
            <h1 className=' uppercase text-3xl'>Registration</h1>
            <div className='w-full h-full flex flex-col p-2 pb-5'>
                <label htmlFor="name" className=' px-2 '>Fullname</label>
                <input required onChange={(e) => setName(e.target.value)} type="text" name='name' id='name' placeholder='fullname' className=' bg-black/60 px-2 p-2  rounded-md backdrop:blur-sm ' />
                <label htmlFor="number" className='px-2 mt-4'>Number</label>
                <input required onChange={(e) => setNumber(e.target.value)} type='text' name='number' id='number' placeholder='number' className=' bg-black/60 px-2 p-2 rounded-md   backdrop:blur-sm' />
                <label htmlFor="email" className='px-2 mt-4'>Email</label>
                <input required onChange={(e) => setEmail(e.target.value)} type="email" name='email' id='email' placeholder='email' className=' bg-black/60 px-2 p-2 rounded-md  backdrop:blur-sm' />
                <label htmlFor="password" className='px-2 mt-4'>Password</label>
                <input required onChange={(e) => setPassword(e.target.value)} type="password" name='password' id='password' placeholder='password' className=' bg-black/60 px-2 p-2 rounded-md  backdrop:blur-sm' />
                <label htmlFor="companyName" className=' px-2 mt-4'>Company Name</label>
                <input required onChange={(e) => setCompanyName(e.target.value)} type="text" name='companyName' id='companyName' placeholder='companyName' className=' bg-black/60 px-2 p-2 rounded-md   backdrop:blur-sm' />
            </div>
            <button
                className='my-3 cursor-pointer hover:underline'
                onClick={() => setAuthForm("login")}
            >I have an account</button>
            <div className='w-full flex flex-col gap-2'>
                <button
                    onClick={() => registrationApi()}
                    className='h-16  flex justify-center p-2  items-center bg-orange-500 w-full rounded-md active:scale-95 duration-300'>

                    {loading ? (<ButtonLoaders />) : " Registration"}
                </button>

            </div>

        </div >
    </>
    )
}

export default Registration
