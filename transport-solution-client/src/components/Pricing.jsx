import React, { useState } from 'react';
import axios from 'axios';
import { X, CheckCircle2 } from 'lucide-react';
import SuccessToster from './toster/SuccessToster'; 

const Pricing = ({ isOpen, onClose }) => {
    const [toast, setToast] = useState({ show: false, success: true, msg: "", id: 0 });

    if (!isOpen) return null;

    const showNotification = (success, msg) => {
        setToast({ show: true, success, msg, id: Date.now() });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 5000);
    };

    const plans = [
        { 
            id: "monthly", 
            name: "Silver Plan", 
            price: "2,999", 
            duration: "1 Month", 
            color: "text-slate-700", 
            btnColor: "bg-slate-900",
            features: ["500 Bilty Generation", "Revenue Reports", "Expense Tracking"]
        },
        { 
            id: "halfYearly", 
            name: "Gold Plan", 
            price: "15,999", 
            duration: "6 Months", 
            popular: true, 
            color: "text-blue-600", 
            btnColor: "bg-blue-600",
            features: ["Unlimited Bilty", "Priority Support", "Advanced Analytics", "Data Backup"]
        },
        { 
            id: "yearly", 
            name: "Platinum Plan", 
            price: "31,999", 
            duration: "1 Year", 
            color: "text-orange-600", 
            btnColor: "bg-orange-600",
            features: ["Unlimited Everything", "Multi-user Access", "Custom Branding", "24/7 Support"]
        }
    ];

    const handlePayment = async (planId) => {
        try {
            const rzpKey = import.meta.env.VITE_APIKEY;
            
            if (!rzpKey) {
                showNotification(false, "Razorpay Key missing in .env file!");
                return;
            }

            const { data } = await axios.post("http://localhost:5000/user/create-order", { planId }, { withCredentials: true });
            
            const options = {
                key: rzpKey, 
                amount: data.order.amount,
                currency: "INR",
                name: "Sawariya Logistic",
                order_id: data.order.id,
                handler: async (response) => {
                    try {
                        const verifyRes = await axios.post("http://localhost:5000/user/verify-payment", { ...response, planId }, { withCredentials: true });
                        if (verifyRes.data.success) {
                            localStorage.setItem("transportUser", JSON.stringify(verifyRes.data.user));
                            showNotification(true, "Premium Activated Successfully! 🚛");
                            setTimeout(() => window.location.reload(), 2000);
                        }
                    } catch (err) {
                        showNotification(false, "Payment Verification Failed!");
                    }
                },
                theme: { color: "#1e293b" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            showNotification(false, error.response?.data?.message || "Payment Initialization Failed");
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            {toast.show && <SuccessToster success={toast.success} msg={toast.msg} id={toast.id} />}
            
            <div className="max-w-6xl w-full relative">
                <button 
                    onClick={onClose} 
                    className="absolute -top-12 right-0 md:-right-4 p-2 bg-white/10 text-white hover:bg-white/20 rounded-full transition-all"
                >
                    <X size={24} />
                </button>

                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">Upgrade to Premium</h2>
                    <p className="text-slate-400 font-medium">Choose a plan that fits your business needs</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div key={plan.id} className={`bg-white p-8 rounded-[2.5rem] shadow-2xl relative transition-all duration-300 hover:scale-[1.02] flex flex-col ${plan.popular ? 'ring-4 ring-blue-500' : ''}`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                                    Best Value
                                </div>
                            )}
                            
                            <div className="mb-6">
                                <h3 className={`text-xl font-black uppercase tracking-tighter ${plan.color}`}>{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mt-4">
                                    <span className="text-4xl font-black text-slate-900">₹{plan.price}</span>
                                    <span className="text-slate-400 font-bold">/{plan.duration}</span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                            <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button 
                                onClick={() => handlePayment(plan.id)} 
                                className={`w-full py-4 ${plan.btnColor} text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all hover:opacity-90`}
                            >
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pricing;