import React, { useEffect } from 'react'
import { X } from "lucide-react"
import Bilty from './Bilty';

function PrintBilty({ pData, setPrintBityBtn }) {
    useEffect(() => {
        console.log("print data", pData)
    }, [pData])

    const handlePrint = () => {
        window.print();
    };

    return (
        /* Screen overlay styling */
        <div className="fixed inset-0 bg-gray-900/50 z-[100] overflow-auto flex justify-center py-5 print:p-0 print:bg-white">
            <div className="relative">
                {/* Print Button & Close - Screen Only */}
                <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow print-hidden">
                    <button
                        className="px-6 py-2 bg-blue-600 text-white rounded-md font-bold shadow-md hover:bg-blue-700 transition-all"
                        onClick={handlePrint}
                    >
                        Print Bilty
                    </button>
                    <X
                        className="p-1 hover:bg-gray-200 rounded-full duration-200 cursor-pointer"
                        size={32}
                        onClick={() => setPrintBityBtn(false)}
                    />
                </div>

           
                    
          
               
                        <Bilty pData={pData} />
                          <Bilty pData={pData} />
                    

            
              

            
            </div>
        </div>
    )
}

export default PrintBilty