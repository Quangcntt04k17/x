import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DangXuat = () =>{
    const navigate = useNavigate();
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    useEffect(() =>{
        navigate("/")
        window.location.reload();   
    },[])
    return(
        <>
        </>
    )
};

export default DangXuat;