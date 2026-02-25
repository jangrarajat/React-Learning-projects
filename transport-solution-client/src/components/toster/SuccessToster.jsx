import React, { useEffect, useState } from "react";
import { Check, CircleX } from "lucide-react";

function SuccessToster({ success, msg , id }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    
    <div key={id}
      className={`fixed top-5 right-0 z-50 transition-all duration-500
      ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
    >
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-l-xl shadow-lg text-white
        ${success ? "bg-green-600" : "bg-red-600"}`}
      >
        {success ? <Check size={20} /> : <CircleX size={20} />}
        <p>{msg}</p>
      </div>
    </div>
  );
}

export default SuccessToster;