import React from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';

 export default function LandingPage(){
       const router = useNavigate();
    return(
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>NexMeet - “Next-gen Meetings”</h2>
                </div>
                <div className='navlist'>
                    <p onClick={()=>{
                        window.location.href = "/bdhc";
                    }}>Join as a Guest</p>
                   <div  onClick={() =>{
                        router("/auth")
                    }} role='button'>
                        <p>Register</p>
                    </div>
                    <div  onClick={() =>{
                        router("/auth")
                    }} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            <div className='landingMainContainer'>
                <div>
                    <h1><span style={{color: "#FF9839"}}>Connect</span>with your loved Ones</h1>
                    <p>Cover a distance by NexMeet</p>
                    <div role='button'>
                        <Link to="/auth">Get Started</Link>
                    </div>
                </div>
                <div>
                    <img src="/mobile.png" alt=""></img>
                </div>
            </div>
         
        </div>
    )
 }