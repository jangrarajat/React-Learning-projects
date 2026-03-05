import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { refreshToken } from "../api/api";

const AddBiltyModal = ({ isOpen, onClose, onSuccess, onError }) => {
  const initialState = {
    InvoiceNo: "", DateOfIssueOfInvoice: "", NameOfRecipient: "",
    GSTINNo: "", Quantity: "", Packages: "", LRNO: "",
    VehicleNo: "", Destination: "", ratePMT: "", advanceCash: "",
    desilOnRent: "", petrolPump: "", DONo: "", DINo: "", TotalInvoiceValue: ""
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/bill/add-bill-entry", formData, {
        withCredentials: true
      });
      if (response.data.success) {
        onSuccess("Biltiy added successfully 🚛");
        setFormData(initialState);
        onClose();
      }
    } catch (error) {
      if (error.response?.status === 401) {
        const isRefreshed = await refreshToken();
        if (isRefreshed) return handleSubmit();
      }
      console.log(error.response.data.mussage)
      onError(error.response.data.mussage || "Failed to add Biltiy");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in duration-300">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight underline decoration-blue-500 decoration-4 underline-offset-8">Add New Biltiy Entry</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={24}/></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(formData).map((key) => (
              <div key={key} className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                <input
                  required
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

          <div className="flex justify-end gap-4 pt-6 border-t">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all duration-200">Cancel</button>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl font-black shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 duration-200"
            >
              {loading ? "Saving..." : "Save Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBiltyModal;