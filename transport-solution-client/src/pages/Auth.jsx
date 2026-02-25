import React, { useState } from 'react'
import Login from '../components/authForm/Login'
import Registration from '../components/authForm/Registration'

function Auth() {
    const [info, setInfo] = useState(true)
    const [authForm, setAuthForm] = useState("option")

    return (
        <>
            {/* AUTH SECTION */}
            <div className="w-full fixed h-screen z-10 
                bg-[url('https://images.pexels.com/photos/29057942/pexels-photo-29057942.jpeg')] 
                bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center">

                {
                    authForm === "option" ? (<div className="bg-black/60 backdrop-blur-md p-10 rounded-xl text-center text-white w-[90%] max-w-md shadow-2xl">

                        <h1 className="text-3xl font-bold mb-3">
                            Transport Management
                        </h1>

                        <p className="text-sm mb-6 text-gray-200 font-thin">
                            Manage your trips, revenue and expenses in one smart dashboard.
                        </p>
                        <div className=' flex gap-2 w-full justify-center'>
                            <button
                                onClick={() => setAuthForm("registration")}
                                className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-md font-semibold duration-300">
                                Registration
                            </button>
                            <button
                                onClick={() => setAuthForm("login")}
                                className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md font-semibold duration-300">
                                Login
                            </button>
                        </div>

                    </div>) : null
                }

                {
                    authForm === "login" ? (<Login  setAuthForm={setAuthForm}/>) : null
                }
                {
                    authForm === "registration" ? (<Registration setAuthForm={setAuthForm} />) : null
                }





            </div>

            {/* INTRO / OVERVIEW SECTION */}
            <div className={`w-full fixed h-screen z-20 
                flex flex-col items-center justify-center 
                bg-[url('https://images.pexels.com/photos/29057942/pexels-photo-29057942.jpeg')] 
                bg-cover bg-center bg-no-repeat text-white
                ${info ? "top-0" : "-top-full"} duration-500`}>

                <div className="absolute inset-0 bg-black/70"></div>

                <div className="relative z-10 max-w-5xl px-6 text-center">

                    <h1 className="text-5xl font-extrabold uppercase mb-4">
                        Welcome to Smart Transport Solution
                    </h1>

                    <p className="text-lg text-gray-200 mb-8 font-thin">
                        A complete digital system designed to simplify your transport business.
                        From trip entry to final payment tracking — manage everything easily,
                        reduce paperwork and increase your profits.
                    </p>

                    {/* FEATURES GRID */}
                    <div className="grid md:grid-cols-3 gap-6 mb-10 font-thin">

                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 duration-300">
                            <h3 className="text-xl font-bold mb-2"> Trip Management</h3>
                            <p className="text-sm text-gray-200">
                                Add freight, diesel, advance cash and commission.
                                Track every trip with full transparency.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 duration-300">
                            <h3 className="text-xl font-bold mb-2"> Revenue Tracking</h3>
                            <p className="text-sm text-gray-200">
                                Auto calculate final amount and balance.
                                View weekly, monthly and yearly revenue reports.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 duration-300">
                            <h3 className="text-xl font-bold mb-2"> Smart Reports</h3>
                            <p className="text-sm text-gray-200">
                                Vehicle-wise insights, expense control and
                                detailed financial analytics.
                            </p>
                        </div>

                    </div>

                    {/* WHY CHOOSE US */}
                    <div className="bg-white/10 backdrop-blur-md w-fit p-6 rounded-xl mb-8">
                        <h3 className="text-2xl font-bold mb-3">Why Choose Our Software?</h3>
                        <ul className="text-gray-200 text-sm  flex items-start ">

                            <li className=''> ✔ Easy to use interface </li>
                            <li className=''> ✔ Secure and reliable data storage</li>
                            <li className=''> ✔ Designed specially for transport companies </li>
                            <li className=''> ✔ Helps increase profit and reduce manual work</li>
                        </ul>
                    </div>

                    <button
                        onClick={() => setInfo(!info)}
                        className="px-8 py-3 bg-blue-700 hover:bg-blue-800 rounded-md font-semibold text-lg duration-300">
                        Get Started
                    </button>

                </div>

            </div>
        </>
    )
}

export default Auth