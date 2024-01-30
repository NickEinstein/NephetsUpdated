import React from 'react';
import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import toDoorLogo from 'images/ManilosLogo2.svg'
import trustedBy3 from '../images/Rectangle 78.png'
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import { useNavigate } from "react-router-dom";
import { Button, Input, MenuItem, Select, TextField, Typography } from '@mui/material';


const LoginHeaderNavComponent = ({image, text1,text2}) => {
    const history = useNavigate();
    const redirect = ()=>{
//   localStorage.setItem('auth', null)
      history('/');
  }
    return (
    
      
         
            <div class="flex">
                <div className=' flex justify-center items-center gap-1  col-span-3'>
                    <img
                      src={image}
                      alt="header navigation logo"
                      className="cursor-pointer w-8"
                      onClick={redirect}
                    />
                    <div className='flex flex-col text-center cursor-pointer'>
                        <Typography className='text-[10px] text-black'>{text1}</Typography>
                        <Typography className='text-[10px] text-black'>{text2}</Typography>
                    </div>
                </div>
            </div>
           
          
       
      
    );
}
export default LoginHeaderNavComponent;
