import React from "react";

const ExpenseTable = ({ data, loading }) => {
  if (loading) return <div className="p-10 text-center font-bold">Fetching Expenses...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Date</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Title</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Purpose</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((ex) => (
            <tr key={ex._id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-slate-600">
                {new Date(ex.expenseDate).toLocaleDateString('en-GB')}
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  ex.title === 'salary' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {ex.title}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 font-bold">
                {ex.amount[1]?.paymentPurpes || "N/A"}
              </td>
              <td className="px-6 py-4 text-sm font-black text-slate-900 uppercase">
                ₹{ex.amount[0]?.payedAmount?.toLocaleString('en-IN')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;