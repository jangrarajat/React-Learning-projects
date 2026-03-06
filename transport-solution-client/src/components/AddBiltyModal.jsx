import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { refreshToken } from "../api/api";

const AddBiltyModal = ({ isOpen, onClose, onSuccess, onError }) => {
  // Aapke backend model aur controller ke hisaab se fields set ki gayi hain
  const initialState = {
    InvoiceNo: "", 
    DateOfIssueOfInvoice: "", 
    NameOfRecipient: "",
    GSTINNo: "", 
    Quantity: "", 
    Packages: "", 
    LRNO: "",
    VehicleNo: "", 
    Destination: "", 
    ratePMT: "",        // Required for frightAmount calculation
    advanceCash: "",    // Required for tripBalance
    desilOnRent: "",    // Required as per your backend check
    petrolPump: "",     // Required if diesel is provided
    DONo: "", 
    DINo: "", 
    TotalInvoiceValue: ""
  };
  
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const transportUser = JSON.parse(localStorage.getItem("transportUser")) || {};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      // Backend controller 'addBillEntry' par request bhej raha hai
      const response = await axios.post("http://localhost:5000/bill/add-bill-entry", formData, {
        withCredentials: true
      });
      
      if (response.data.success) {
        // Local storage update for demo limit check
        const updatedUser = { 
          ...transportUser, 
          biltyCount: (transportUser.biltyCount || 0) + 1 
        };
        localStorage.setItem("transportUser", JSON.stringify(updatedUser));

        onSuccess("Bilty added successfully 🚛");
        setFormData(initialState);
        onClose();
      }
    } catch (error) {
      if (error.response?.status === 401) {
        const isRefreshed = await refreshToken();
        if (isRefreshed) return handleSubmit();
      }
      // Backend 'mussage' key use kar raha hai error ke liye
      onError(error.response?.data?.mussage || "Failed to add Bilty");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in duration-300 my-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight underline decoration-blue-500 decoration-4 underline-offset-8 uppercase tracking-widest">New Bilty & Trip Entry</h2>
          <button onClick={onClose} type="button" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24}/></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(formData).map((key) => (
              <div key={key} className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  required={key !== "petrolPump" && key !== "advanceCash"} // petrolPump optional ho sakta hai depend on diesel
                  type={key === "DateOfIssueOfInvoice" ? "date" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all bg-slate-50 font-medium"
                  placeholder={`Enter ${key}`}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t font-bold">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-all duration-200 order-2 sm:order-1">Cancel</button>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl font-black shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 duration-200 order-1 sm:order-2 uppercase text-xs tracking-widest"
            >
              {loading ? "Saving..." : "Save Bilty & Trip"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBiltyModal;