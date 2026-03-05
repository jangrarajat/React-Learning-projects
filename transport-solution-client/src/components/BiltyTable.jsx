import { Contact, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import PrintBilty from "./PrintBilty";

const BiltyTable = ({ data, loading }) => {
    const [printBityBtn, setPrintBityBtn] = useState(false)
    const [pData , setPData] = useState([]) 
     

    const setPrintData = (bill) => {
        setPrintBityBtn(!printBityBtn)
       setPData(bill)
      
    }

    if (loading) return <div className="h-64 flex items-center justify-center bg-white rounded-xl">Loading...</div>;
    return (
        <>
            <div className="bg-white shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto overflow-y-auto ">
                    <table className="w-full text-left border-collapse">
                        <thead className="sticky top-0 z-20 bg-slate-800 text-white">
                            <tr>
                                {["Invoice No", "Date", "LR NO.", "DI No.", "DO No.", "Name Of Recipient",
                                    "Destination", "Vehicle", "Qty", "Packages", "GSTINNo",
                                    "Total Invoice Value", "Print bilty", "fright Amount", "desil", "commeion", "advance Cash", "trip Balance Ammount", "faynal Ammount",
                                ].map((h) => (
                                    <th key={h} className="px-4 py-3.5 text-[11px] uppercase tracking-wider font-bold border-r border-slate-700 last:border-0 whitespace-nowrap">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.map((bill) => (
                                <tr key={bill._id} className="  transition-colors">
                                    <td className="px-4 text-center py-3 text-sm font-bold text-blue-600">{bill.InvoiceNo}</td>
                                    <td className="px-4 text-center py-3 text-sm text-slate-500 whitespace-nowrap">{bill.DateOfIssueOfInvoice}</td>
                                    <td className="px-4 text-center py-3 text-sm font-medium text-slate-700 min-w-[180px]">{bill.LRNO}</td>
                                    <td className="px-4 text-center py-3 text-sm font-medium text-slate-700 min-w-[180px]">{bill.DINo}</td>
                                    <td className="px-4 text-center py-3 text-sm font-medium text-slate-700 min-w-[180px]">{bill.DONo}</td>
                                    <td className="px-4 text-center py-3 text-sm font-medium text-slate-700 min-w-[180px]">{bill.NameOfRecipient}</td>
                                    <td className="px-4 text-center py-3 text-sm text-slate-600">{bill.Destination}</td>
                                    <td className="px-4 text-center py-3 text-sm font-mono text-slate-700 whitespace-nowrap">{bill.VehicleNo}</td>
                                    <td className="px-4 text-center py-3 text-sm text-slate-600 ">{bill.Quantity}</td>
                                    <td className="px-4 text-center py-3 text-sm text-slate-600 ">{bill.Packages}</td>
                                    <td className="px-4 text-center py-3 text-sm font-medium text-slate-700 min-w-[180px]">{bill.GSTINNo}</td>
                                    <td className="px-4 text-center py-3 text-sm font-bold text-green-600 whitespace-nowrap">₹{bill.TotalInvoiceValue || "0"}</td>
                                    <td className="px-4 text-center py-3 text-sm font-bold text-blue-600 whitespace-nowrap flex items-center justify-center cursor-pointer" onClick={()=>setPrintData(bill)}><Printer /></td>
                                    <td className="px-4 text-center py-3 text-sm font-bold text-yellow-400 whitespace-nowrap">₹{bill.frightAmount || "0"}</td>
                                    <td className="px-4 text-center py-3 text-sm font-bold text-red-400 whitespace-nowrap">₹{bill.desil || "0"}</td>
                                    <td className="px-4 text-center py-3 text-sm font-bold  whitespace-nowrap">₹{bill.commeion || "0"}</td>
                                    <td className="px-4 text-center py-3 text-sm font-bold  whitespace-nowrap">₹{bill.advanceCash || "0"}</td>
                                    <td className="px-4 text-center py-3 text-sm font-bold text-green-600 whitespace-nowrap">₹{bill.tripBalanceAmmount || "0"}</td>
                                    <td className="px-4 text-center py-3 text-sm font-bold text-green-600 whitespace-nowrap">₹{bill.faynalAmmount || "0"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* print bilty  */}
            {
                printBityBtn ? (<PrintBilty pData={pData} setPrintBityBtn={setPrintBityBtn} />) : null
            }

        </>
    );
};
export default BiltyTable;