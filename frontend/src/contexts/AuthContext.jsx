import { useContext, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import httpStatus from 'http-status';
import server from "../environment";


export const AuthContext = createContext({});
const client = axios.create({
      baseURL: `${server}/api/v1/users`
})

export const AuthProvider = ({children}) => {
    const authContext = useContext(AuthContext);

    const [userData, setUserData] = useState(authContext);
    const handleRegister = async (name, username, password)=>{
        try{
            let request = await client .post("/register",{
                name: name,
                username: username,
                password: password
            })
            if(request.status === httpStatus.CREATED){
                return request.data.message;
            }
        } catch(err){
            throw err;
        }
    }


  const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });

            // console.log(username, password)
            // console.log(request.data)

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                router("/home")
            }
        } catch (err) {
            throw err;
        }
    }

  const getHistoryOfUser = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("📤 Sending token from frontend:", token);

    const response = await client.post("/get_all_activity", { token });
    console.log("📥 Backend responded with:", response.data);
    return response.data;
  } catch (err) {
    console.error("❌ Error in getHistoryOfUser:", err);
    throw err;
  }
};


    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }




    const router = useNavigate();
    const data = {
        userData, setUserData, handleRegister, handleLogin, getHistoryOfUser, addToUserHistory 
    }
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

