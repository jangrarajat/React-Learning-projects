import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { refreshToken } from "../api/api";

const AddExpenseModal = ({ isOpen, onClose, onSuccess, onError }) => {
    const initialState = {
        title: "salary",
        payedAmount: "",
        paymentPurpes: "",
        expenseDate: new Date().toISOString().split('T')[0],
        descraption: ""
    };
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);

        const payload = {
            title: formData.title,
            amount: [
                { payedAmount: Number(formData.payedAmount) },
                { paymentPurpes: formData.paymentPurpes }
            ],
            descraption: formData.descraption,
            expenseDate: formData.expenseDate
        };

        try {
            const response = await axios.post("http://localhost:5000/persnol/expantion", payload, {
                withCredentials: true
            });
            if (response.data.success) {
                onSuccess("Expense added successfully 💰");
                setFormData(initialState);
                onClose();
            }
        } catch (error) {
            if (error.response?.status === 401) {
                const isRefreshed = await refreshToken();
                if (isRefreshed) return handleSubmit();
            }
            onError(error.response?.data?.message || "Failed to record expense");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-in slide-in-from-bottom duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter decoration-blue-500 decoration-4 underline underline-offset-4">Add Expense</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 font-medium">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Category</label>
                        <select
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 duration-200 mt-2"
                        >
                            <option value="salary">Salary</option>
                            <option value="bills">Office Bills</option> 
                            <option value="other">Others</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</label>
                            <input required type="number" placeholder="0.00" className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 mt-2 outline-none focus:border-blue-500"
                                value={formData.payedAmount} onChange={(e) => setFormData({ ...formData, payedAmount: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</label>
                            <input required type="date" className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 text-sm mt-2 outline-none focus:border-blue-500"
                                value={formData.expenseDate} onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Purpose / Recipient</label>
                        <input required type="text" placeholder="e.g., Staff Name or Rent" className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 mt-2 outline-none focus:border-blue-500"
                            value={formData.paymentPurpes} onChange={(e) => setFormData({ ...formData, paymentPurpes: e.target.value })} />
                    </div>

                    <button disabled={loading} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black shadow-xl active:scale-95 transition-all mt-4 tracking-widest uppercase text-xs">
                        {loading ? "Processing..." : "Confirm Expense"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddExpenseModal;