import React, { useState } from "react";
import LoginAPi from "apis/LoginApi";
// import SignupApi from "apis/SignupApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

import { FcGoogle } from "react-icons/fc";
// import { Button, TextField, Typography } from "@mui/material";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import useAuthUser from "hooks/useAuthUser";
import { Link, Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toDoorLogo from "images/Ellipse 30.png";
import background from "images/background.png";
import snake from "images/Nephets Assets/permanentRes.svg";
import handshake from "images//Nephets Assets/handshake.svg";

// import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import trustedBy2 from "images/Rectangle 7.png";
import trustedBy3 from "images/Rectangle 106.png";
// import LoginHeader from './LoginHeader';
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import {
  Avatar,
  Button,
  Input,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WallCards from "common/CompanyRiderCard";
import WallCardsServices from "common/WallCardsServices";
import WallCardsTestimonies from "common/WallCardsTestimonies";

function PermanentResidence(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  // console.log(localStorage.getItem('authUser'))
  const history = useNavigate();

  const redirect = () => {
    // localStorage.setItem('authUser', 'true')

    history("/dashboard");
  };

  // console.log(localStorage.getItem('authUser'))

  // const authUser = useAuthUser();

  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = LoginAPi.useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: yup.object({
      username: yup.string().trim().required(),
      password: yup.string().trim().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      localStorage.setItem("il", true);
      // redirect();
      // history('/dashboard')

      try {
        setIsLoading(true);
        const data = await loginMuation({ data: values }).unwrap();
        // TODO extra login
        setIsLoading(false);
        if (data.data)
          enqueueSnackbar("Logged in successful", { variant: "success" });
        redirect();
      } catch (error) {
        setIsLoading(false);

        enqueueSnackbar(
          error?.data?.message || "Something went wrong",
          "Failed to login",
          {
            variant: "error",
          }
        );
      }
    },
  });

  return (
    <div className=" w-full bg-black ">
      <LoginHeader />
      <div className="relative bg-no-repeat bg-[#662817] bg-cover box-border text-white w-full flex flex-col pt-20">
        <div className="flex justify-between items-end px-10 pb-[5%] w-full">
          <Typography
            variant="h1"
            className="font-bold  text-[124px] w-3/12  text-left leading-[140px]"
          >
            Permanent residence
          </Typography>

          <div className="w-2/12  min-w-[360px] pb-7 ">
            <Typography className="text-base">
              At Nehpets Consulting, we are more than just a consultancy—we are
              your dedicated channel to success in the world of Canadian
              immigration.
            </Typography>
            <Button className="rounded-full bg-white text-black h-12 px-12 mt-8 mb-3">
              Book Now
            </Button>
          </div>
        </div>
        <img src={snake} className="w-full" />
      </div>

      <div className="bg-[#FCF9EE] py-[2px] w-full items-center px-[5%]">
        <Typography className="font-bold text-[88px] text-left mb-12 mt-28 ">
          Our Packages
        </Typography>

        <div className="flex gap-8">
          <Paper elevation={3} className="flex flex-col gap-6 rounded-3xl">
            <Typography className="font-bold bg-[#A2241A] p-2 text-white text-center rounded-t-3xl">
              POPULAR
            </Typography>
            <div class="flex px-4 pb-6 flex-col gap-6">
              <div>
                <Typography className="font-bold text-[32px]">
                  Student Visa
                </Typography>
                <Typography className="text-[14px]">
                  The diversity of life has resulted in the acceptance of
                  immigrants and the international community to the educational
                  system in Canada. This has been shown by their process and
                  principle of education. There is a free education to a grade
                  level of 12 with low financing Interest and a scholarship
                  awarded to an outstanding student.
                </Typography>
              </div>
              <Button className="w-full bg-[#A2241A] h-12">Book Now</Button>
              <div>
                <Typography className="font-bold text-[32px] ">
                  What do we Offer
                </Typography>
                <div className="px-6">
                  <Typography className=" list-item text-[14px]">
                    Profile assessment and an interview to evaluate your resume
                    and document.
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Application process, profile creation and Visa
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Follow up on the application and provide the necessary
                    information.
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Arriving assistance and support (Accommodation, airport
                    pickup and integration support services)
                  </Typography>
                </div>
              </div>
              <div className="px-6">
                <Typography className="font-bold text-[32px] ">
                  Process
                </Typography>
                <div className="">
                  <Typography className=" list-item text-[14px]">
                    Profile assessment and an interview to evaluate your resume
                    and document.
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Application process, profile creation and Visa
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Follow up on the application and provide the necessary
                    information.
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Arriving assistance and support (Accommodation, airport
                    pickup and integration support services)
                  </Typography>
                </div>
              </div>
            </div>
          </Paper>
          <Paper
            elevation={3}
            className="flex flex-col gap-6 rounded-3xl bg-[#A2241A] text-white"
          >
            <Typography className="font-bold bg-[white] p-2 text-[#A2241A] text-center rounded-t-3xl">
              MOST POPULAR
            </Typography>
            <div class="flex px-4 pb-6 flex-col gap-6">
              <div>
                <Typography className="font-bold text-[32px]">
                  Visitor’s Visa
                </Typography>
                <Typography className="text-[14px]">
                  The diversity of life has resulted in the acceptance of
                  immigrants and the international community to the educational
                  system in Canada. This has been shown by their process and
                  principle of education. There is a free education to a grade
                  level of 12 with low financing Interest and a scholarship
                  awarded to an outstanding student.
                </Typography>
              </div>
              <Button className="w-full text-[#A2241A] bg-[white] h-12">
                Book Now
              </Button>
              <div>
                <Typography className="font-bold text-[32px] ">
                  What do we Offer
                </Typography>
                <div className="px-6">
                  <Typography className=" list-item text-[14px]">
                    Profile assessment and an interview to evaluate your resume
                    and document.
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Application process, profile creation and Visa
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Follow up on the application and provide the necessary
                    information.
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Arriving assistance and support (Accommodation, airport
                    pickup and integration support services)
                  </Typography>
                </div>
              </div>
              <div className="px-6">
                <Typography className="font-bold text-[32px] ">
                  Process
                </Typography>
                <div className="">
                  <Typography className=" list-item text-[14px]">
                    Profile assessment and an interview to evaluate your resume
                    and document.
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Application process, profile creation and Visa
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Follow up on the application and provide the necessary
                    information.
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Arriving assistance and support (Accommodation, airport
                    pickup and integration support services)
                  </Typography>
                </div>
              </div>
            </div>
          </Paper>
          <Paper elevation={3} className="flex flex-col gap-6 rounded-3xl">
            <Typography className="font-bold bg-[#A2241A] p-2 text-white text-center rounded-t-3xl">
              POPULAR
            </Typography>
            <div class="flex px-4 pb-6 flex-col gap-6">
              <div>
                <Typography className="font-bold text-[32px]">
                  Care-giver
                </Typography>
                <Typography className="text-[14px]">
                  The diversity of life has resulted in the acceptance of
                  immigrants and the international community to the educational
                  system in Canada. This has been shown by their process and
                  principle of education. There is a free education to a grade
                  level of 12 with low financing Interest and a scholarship
                  awarded to an outstanding student.
                </Typography>
              </div>
              <Button className="w-full bg-[#A2241A] h-12">Book Now</Button>
              <div>
                <Typography className="font-bold text-[32px] ">
                  What do we Offer
                </Typography>
                <div className="px-6">
                  <Typography className=" list-item text-[14px]">
                    Profile assessment and an interview to evaluate your resume
                    and document.
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Application process, profile creation and Visa
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Follow up on the application and provide the necessary
                    information.
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Arriving assistance and support (Accommodation, airport
                    pickup and integration support services)
                  </Typography>
                </div>
              </div>
              <div className="px-6">
                <Typography className="font-bold text-[32px] ">
                  Process
                </Typography>
                <div className="">
                  <Typography className=" list-item text-[14px]">
                    Profile assessment and an interview to evaluate your resume
                    and document.
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Application process, profile creation and Visa
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Follow up on the application and provide the necessary
                    information.
                  </Typography>
                  <Typography className=" list-item text-[14px]">
                    Arriving assistance and support (Accommodation, airport
                    pickup and integration support services)
                  </Typography>
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default PermanentResidence;
