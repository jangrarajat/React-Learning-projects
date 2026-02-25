import React, { useContext , useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import SuccessToster from '../toster/SuccessToster';
function Login({ setAuthForm }) {
    const { user } = useAuth();
    const [toast, setToast] = useState({
        id: Date.now(),
        show: false,
        success: true,
        message: ""
    });


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
                <input type="email" name='email' id='email' placeholder='email' className=' bg-black/60 px-2 p-2 rounded-md  backdrop:blur-sm' />
                <label htmlFor="password" className='px-2 mt-4'>Password</label>
                <input type="password" name='password' id='password' placeholder='password' className=' bg-black/60 px-2 p-2 rounded-md  backdrop:blur-sm' />

            </div>

            <button
                className='my-3 cursor-pointer hover:underline'
                onClick={() => setAuthForm("registration")}
            >don't have account</button>
            <button className='p-2 bg-blue-500 w-[90%] rounded-md '>Login</button>

        </div>
    )
}

export default Login
