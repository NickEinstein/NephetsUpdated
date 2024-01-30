import React, { useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
// import { Button, TextField, Typography } from "@mui/material";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import useAuthUser from "hooks/useAuthUser";
import { Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toDoorLogo from "images/Ellipse 30.png";
import background from "images/background.png";

import snake from "images/Mask group.png";
import trustedBy3 from "images/Rectangle 106.png";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function DashboardStatisticsCard({text1,text2}) {
  const [age, setAge] = React.useState("");
  
  const history = useNavigate();

//   const redirect = () => {
//     history("/complete-signUp");
//   };

  const authUser = useAuthUser();

  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = UserApi.useLoginMutation();

 

  return (
    <div className="relative cursor-pointer">
      <Card
        className=" w-[190px] h-[85px] cursor-pointer"
      
      >
      
        <CardContent >
        <div class="flex flex-col">
                <div className=' flex flex-col justify-center items-center gap-1 col-span-3'>
                   
                    <div className='flex flex-col text-center cursor-pointer'>
                        <Typography  className='text-xs text-black'>{text1}</Typography>
                        <Typography variant="h4" className='font-bold text-[#1B9EDE]'>{text2}</Typography>
                        <Typography  className='text-[8px] text-[#9D9595]'>{'Total'}</Typography>
                    </div>
                </div>
            </div>
           
         
        </CardContent>

        {/* <Button size="small">Learn More</Button> */}
      </Card>
    </div>
  );
}

export default DashboardStatisticsCard;
