import React from "react";
import { CheckCircle, Clock, RefreshCw } from "lucide-react";

const PetrolPumpTable = ({ data, loading, onUpdatePayment }) => {
  if (loading) return <div className="p-20 text-center font-bold">Loading Pump Data...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Pump Name</th>
              <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Amount</th>
              <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? data.map((pump) => (
              <tr key={pump._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-800 capitalize">{pump.petrolPumpName}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-black text-blue-600">₹{pump.amount.toLocaleString('en-IN')}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-slate-500">{new Date(pump.createdAt).toLocaleDateString('en-GB')}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                    pump.payment === "payed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {pump.payment === "payed" ? <CheckCircle size={12}/> : <Clock size={12}/>}
                    {pump.payment}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onUpdatePayment(pump._id, pump.payment)}
                    className={`p-2 rounded-lg transition-all active:scale-90 shadow-sm border ${
                      pump.payment === "payed" 
                      ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100"
                    }`}
                    title="Mark as Payed/Unpayed"
                  >
                    <RefreshCw size={16} />
                  </button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" className="p-10 text-center text-slate-400">No records found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PetrolPumpTable;