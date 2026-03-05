import React, { useEffect, useState, useCallback } from "react";
import { 
  Truck, FileText, Fuel, BarChart3, Menu, X, 
  ChevronLeft, ChevronRight, Plus, LogOut, 
  TrendingUp, Wallet, Receipt, Search 
} from "lucide-react";
import axios from "axios";
import { refreshToken } from "../api/api";
import { useNavigate } from "react-router-dom";

// Components
import BiltyTable from "../components/BiltyTable"; 
import AddBiltyModal from "../components/AddBiltyModal";
import PetrolPumpTable from "../components/PetrolPumpTable";
import ExpenseTable from "../components/ExpenseTable";
import AddExpenseModal from "../components/AddExpenseModal";
import SuccessToster from "../components/toster/SuccessToster";

function Home() {
  const navigate = useNavigate();
  const [menuOption, setMenuOption] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExModalOpen, setIsExModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, success: true, msg: "", id: 0 });

  const [biltyData, setBiltyData] = useState([]);
  const [pumpData, setPumpData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [dashData, setDashData] = useState({ totalRevenue: 0, totalTripBalance: 0 });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [exTitle, setExTitle] = useState(""); 
  const [dashFilter, setDashFilter] = useState("month");
  const [searchTerm, setSearchTerm] = useState(""); // New Search State

  const transportUser = JSON.parse(localStorage.getItem("transportUser")) || {};

  const showNotification = (success, msg) => {
    setToast({ show: true, success, msg, id: Date.now() });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 5000);
  };

  const getDashboardData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/dashbord?filter=${dashFilter}`, { withCredentials: true });
      if (response.data.success) setDashData(response.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        const isRefreshed = await refreshToken();
        if (isRefreshed) getDashboardData();
      }
    }
  }, [dashFilter]);

  const getBilty = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/bill/get-bills?page=${page}&limit=50&year=${selectedYear}&month=${selectedMonth}&search=${searchTerm}`, { withCredentials: true });
      console.log(response)
      if (response.data.success) {
        setBiltyData(response.data.bills);
        setTotalPages(response.data.totalPage);
        setCurrentPage(response.data.page);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        const isRefreshed = await refreshToken();
        if (isRefreshed) getBilty(page);
      }
    } finally { setLoading(false); }
  }, [selectedYear, selectedMonth, searchTerm]);

  const getPetrolPumps = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/bill/get-petrolPumps?page=${page}&month=${selectedMonth}&year=${selectedYear}`, { withCredentials: true });
      if (response.data.success) {
        setPumpData(response.data.pumpData);
        setTotalPages(response.data.totalPage);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        const isRefreshed = await refreshToken();
        if (isRefreshed) getPetrolPumps(page);
      }
    } finally { setLoading(false); }
  }, [selectedYear, selectedMonth]);

  const getExpenses = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/persnol/get-expantion?page=${page}&title=${exTitle}&month=${selectedMonth}&year=${selectedYear}&search=${searchTerm}`, { withCredentials: true });
      if (response.data.success) {
        setExpenseData(response.data.expantions);
        setTotalPages(response.data.totalPage);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        const isRefreshed = await refreshToken();
        if (isRefreshed) getExpenses(page);
      }
    } finally { setLoading(false); }
  }, [selectedYear, selectedMonth, exTitle, searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
        if (menuOption === "home") getDashboardData();
        else if (menuOption === "biltiy") getBilty(currentPage);
        else if (menuOption === "petrolPump") getPetrolPumps(currentPage);
        else if (menuOption === "expantion") getExpenses(currentPage);
    }, 400); // Debounce to prevent too many API calls while typing

    return () => clearTimeout(delayDebounceFn);
  }, [menuOption, getDashboardData, getBilty, getPetrolPumps, getExpenses, currentPage, selectedYear, selectedMonth, exTitle, searchTerm]);

  const years = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - i);
  const months = [{ name: "Jan", value: "1" }, { name: "Feb", value: "2" }, { name: "Mar", value: "3" }, { name: "Apr", value: "4" }, { name: "May", value: "5" }, { name: "Jun", value: "6" }, { name: "Jul", value: "7" }, { name: "Aug", value: "8" }, { name: "Sep", value: "9" }, { name: "Oct", value: "10" }, { name: "Nov", value: "11" }, { name: "Dec", value: "12" }];

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      {toast.show && <SuccessToster success={toast.success} msg={toast.msg} id={toast.id} />}
      
      <AddBiltyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={(msg) => { getBilty(1); showNotification(true, msg); }} onError={(msg) => showNotification(false, msg)} />
      <AddExpenseModal isOpen={isExModalOpen} onClose={() => setIsExModalOpen(false)} onSuccess={(msg) => { getExpenses(1); showNotification(true, msg); }} onError={(msg) => showNotification(false, msg)} />

      <aside className={`${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-0 md:translate-x-0 md:w-20"} fixed md:relative z-50 h-full bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-2xl`}>
        <div className="p-5 flex items-center justify-between border-b border-slate-800">
          {(sidebarOpen || window.innerWidth < 768) && <span className="font-black text-lg text-blue-400 tracking-tighter uppercase">SAWARIYA.</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors"><Menu size={20}/></button>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-2">
          {[
            { name: "home", icon: <BarChart3 size={20} />, label: "Dashboard" },
            { name: "biltiy", icon: <FileText size={20} />, label: "Bilty Records" },
            { name: "petrolPump", icon: <Fuel size={20} />, label: "Petrol Pump" },
            { name: "expantion", icon: <Receipt size={20} />, label: "Expenses" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => { setMenuOption(item.name); setCurrentPage(1); setSearchTerm(""); if(window.innerWidth < 768) setSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-[10px] uppercase tracking-widest ${menuOption === item.name ? "bg-blue-600 text-white shadow-xl shadow-blue-900/40" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
           <button onClick={()=>{localStorage.clear(); navigate("/auth")}} className="w-full flex items-center gap-4 p-4 rounded-xl text-red-400 font-bold text-[10px] uppercase hover:bg-red-500/10"><LogOut size={20} /> {sidebarOpen && "Logout"}</button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white border-b flex items-center justify-between px-8 shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 bg-slate-100 rounded-lg" onClick={() => setSidebarOpen(true)}><Menu size={20}/></button>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{menuOption} Dashboard</h1>
          </div>
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black uppercase shadow-lg transform rotate-3">{transportUser.companyName?.[0]}</div>
        </header>

        <main className="p-6 md:p-10 overflow-y-auto grow bg-gray-50/50">
          {/* Dashboard View */}
          {menuOption === "home" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-900 underline decoration-blue-500 decoration-4 underline-offset-8">Revenue Overview</h2>
                <div className="bg-white p-1 rounded-xl shadow-sm border flex gap-1 font-bold">
                  {["week", "month", "year"].map((f) => (
                    <button key={f} onClick={() => setDashFilter(f)} className={`px-4 py-1.5 rounded-lg text-[10px] uppercase tracking-widest ${dashFilter === f ? "bg-blue-600 text-white shadow-md" : "text-slate-500"}`}>{f}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-xl transition-all group">
                  <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg group-hover:scale-110 duration-300"><TrendingUp size={24}/></div>
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-none">Total Revenue</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-2 tracking-tighter">₹{dashData.totalRevenue?.toLocaleString('en-IN')}</h3>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-xl transition-all group">
                  <div className="p-4 bg-orange-500 rounded-2xl text-white shadow-lg group-hover:scale-110 duration-300"><Wallet size={24}/></div>
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-none">Trip Balance</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-2 tracking-tighter">₹{dashData.totalTripBalance?.toLocaleString('en-IN')}</h3>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bilty View */}
          {menuOption === "biltiy" && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search LR, DI, Vehicle, Name..." 
                      className="w-full pl-10 pr-4 py-2 border rounded-lg text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select value={selectedYear} onChange={(e)=>setSelectedYear(e.target.value)} className="border rounded-lg px-4 py-2 text-xs font-bold bg-gray-50 outline-none">{years.map(y => <option key={y} value={y}>{y}</option>)}</select>
                  <select value={selectedMonth} onChange={(e)=>setSelectedMonth(e.target.value)} className="border rounded-lg px-4 py-2 text-xs font-bold bg-gray-50 outline-none">{months.map(m => <option key={m.value} value={m.value}>{m.name}</option>)}</select>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 text-xs font-black uppercase shadow-lg active:scale-95 duration-200"><Plus size={18}/> New Bilty</button>
              </div>
              <BiltyTable data={biltyData} loading={loading} setIsModalOpen={setIsModalOpen} />
            </div>
          )}

          {/* Petrol Pump View */}
          {menuOption === "petrolPump" && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                  <select value={selectedYear} onChange={(e)=>setSelectedYear(e.target.value)} className="border rounded-lg px-4 py-2 text-xs font-bold bg-gray-50">{years.map(y => <option key={y} value={y}>{y}</option>)}</select>
                  <select value={selectedMonth} onChange={(e)=>setSelectedMonth(e.target.value)} className="border rounded-lg px-4 py-2 text-xs font-bold bg-gray-50">{months.map(m => <option key={m.value} value={m.value}>{m.name}</option>)}</select>
                </div>
              <PetrolPumpTable data={pumpData} loading={loading} />
            </div>
          )}

          {/* Expenses View */}
          {menuOption === "expantion" && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-3 flex-1">
                  <div className="relative flex-1 max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search Purpose or Date..." 
                      className="w-full pl-10 pr-4 py-2 border rounded-xl text-xs font-bold outline-none shadow-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select value={exTitle} onChange={(e)=>setExTitle(e.target.value)} className="border rounded-xl px-4 py-2 text-xs font-black uppercase bg-white outline-none shadow-sm">
                    <option value="">All Expenses</option>
                    <option value="salary">Salary Only</option>
                    <option value="bills">Office Bills</option>
                    <option value="other">Others</option>
                  </select>
                  <select value={selectedYear} onChange={(e)=>setSelectedYear(e.target.value)} className="border rounded-xl px-4 py-2 text-xs font-black uppercase bg-white shadow-sm outline-none">{years.map(y => <option key={y} value={y}>{y}</option>)}</select>
                  <select value={selectedMonth} onChange={(e)=>setSelectedMonth(e.target.value)} className="border rounded-xl px-4 py-2 text-xs font-black uppercase bg-white shadow-sm outline-none">{months.map(m => <option key={m.value} value={m.value}>{m.name}</option>)}</select>
                </div>
                <button onClick={()=>setIsExModalOpen(true)} className="bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 duration-200">
                  <Plus size={16}/> New Expense
                </button>
              </div>
              <ExpenseTable data={expenseData} loading={loading} />
            </div>
          )}

          {/* Pagination */}
          {menuOption !== "home" && (
            <div className="flex items-center justify-between bg-white px-6 py-4 mt-6 rounded-2xl border shadow-sm border-slate-200">
              <p className="text-[10px] font-black uppercase text-slate-400">Page {currentPage} of {totalPages}</p>
              <div className="flex gap-2">
                <button disabled={currentPage === 1} onClick={()=>setCurrentPage(p=>p-1)} className="p-2 border rounded-xl hover:bg-slate-50 disabled:opacity-20 transition-all duration-200"><ChevronLeft size={18}/></button>
                <button disabled={currentPage === totalPages} onClick={()=>setCurrentPage(p=>p+1)} className="p-2 border rounded-xl hover:bg-slate-50 disabled:opacity-20 transition-all duration-200"><ChevronRight size={18}/></button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;