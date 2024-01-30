import React from 'react';
import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import toDoorLogo from 'images/IkejaElectricLogo.svg'
import trustedBy3 from '../images/Rectangle 78.png'
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import { useNavigate } from "react-router-dom";
import { Button, Input, MenuItem, Select, TextField, Typography } from '@mui/material';


const LoginHeader = (prop) => {
    const history = useNavigate();
    const redirect = ()=>{
//   localStorage.setItem('auth', null)
      history('/');
  }
    return (
      <div className="flex justify-center">
        <div className="flex items-center">
          <div className="flex relative items-center justify-center w-full">
            <img
              src={toDoorLogo}
              alt="softwork logo"
              className="w-36"
              onClick={redirect}
            />
           
          </div>
          
        </div>
      </div>
    );
}
export default LoginHeader;
