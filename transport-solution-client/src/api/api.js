import axios from "axios";

const refreshToken = async () => {
    try {
        // Empty object {} bhej rahe hain kyunki POST request hai
        // withCredentials: true bahut zaroori hai cookies ke liye
        const res = await axios.post('http://localhost:5000/user/refresh-token', {}, {
            withCredentials: true 
        });

        if (res.data.success) {
            console.log("Token Refreshed via Cookies! ✅");
            return true; // Return true taaki caller ko pata chale refresh ho gaya
        }
        
        return false;
    } catch (error) {
        console.error("Refresh token failed! ❌", error.response?.data);
        localStorage.removeItem("transportUser"); // Profile data hatao
        window.location.href = "/auth"; 
        return false;
    }
};

export { refreshToken };