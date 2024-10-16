import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Redirector = ({isAuth}) => {
const navigate = useNavigate()

if(isAuth){
    Navigate("/dashboard")
}
Navigate("/login")


};

export default Redirector;
