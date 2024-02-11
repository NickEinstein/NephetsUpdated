import React, { useState } from "react";
import LoginAPi from "apis/LoginApi";
import { useSnackbar } from "notistack";

import snake from "images/Nephets Assets/PermanentResBig.svg";
import snake2 from "images/Nephets Assets/PermanentResmobile.svg";
// import snake from "images/Nephets Assets/aboutUs2.svg";
import { MediaQueryBreakpointEnum } from "constants/Global";
import { useMediaQuery } from "@mui/material";


import {
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function PermanentResidence(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const history = useNavigate();

  const redirect = () => {

    history("/dashboard");
  };
  const issm = useMediaQuery(MediaQueryBreakpointEnum.sm);
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);



  return (
    <div className=" w-full bg-black ">
      <div className="relative bg-no-repeat bg-[#662817] bg-cover max-h-[810px] box-border text-white w-full flex flex-col lg:px-10 p-[6%] py-8 pt-12 lg:pb-10 lg:pt-60 ">
        <div className="flex flex-col lg:flex-row lg:gap-16 gap-6 items-end  w-full">
          <Typography
            variant="h1"
            className="font-bold  lg:text-[5.2rem] text-4xl  text-left lg:leading-[90px] leading-35px"
          >
           Permanent Residence
          </Typography>

          <div className="lg:w-2/12 hidden md:block md:min-w-[295px] pb-3  w-full ">
            <Typography className="lg:text-base text-[14px">
              Planning together to achieve your japa dreams. We work with you to
              achieve your dreams of traveling abroad.
            </Typography>

            <Button className="h-12 px-12 text-primary-main bg-white mt-5 font-bold">
              Book Now
            </Button>
          </div>

          <div className="lg:hidden md:min-w-[295px] pb-3 w-full">
            <Typography className="lg:text-base text-[14px ">
              Planning together to achieve your japa dreams.<br/> We work with you to
              achieve <br/>your dreams of traveling abroad.
            </Typography>
            <Button className="h-12 px-12 text-primary-main bg-white mt-5 font-bold">
              Book Now
            </Button>
          </div>
        </div>
      </div>
      <img alt="" src={issm ? snake :ismd?snake: snake2} className=" w-full lg:h-full" />

      <div className="bg-[#FCF9EE] py-[2px] w-full items-center px-[5%]">
        <Typography className="font-bold lg:text-7xl text-4xl text-left my-12 lg:mt-28 ">
          Our Packages
        </Typography>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
          <Paper elevation={3} className="flex flex-col gap-6 rounded-3xl">
            <Typography className="font-bold bg-[#A2241A] p-2 text-white text-center rounded-t-3xl">
              POPULAR
            </Typography>
            <div class="flex px-4 pb-6 flex-col gap-6">
              <div>
                <Typography className="font-bold lg:text-4xl text-2xl">
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
              <Button className="w-full bg-[#A2241A] h-11">Book Now</Button>
              <div>
                <Typography className="font-bold lg:text-4xl text-2xl ">
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
                <Typography className="font-bold lg:text-4xl text-2xl ">
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
                <Typography className="font-bold lg:text-4xl text-2xl">
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
              <Button className="w-full bg-white text-primary-main h-11 ">
                Book Now
              </Button>
              <div>
                <Typography className="font-bold lg:text-4xl text-2xl ">
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
                <Typography className="font-bold lg:text-4xl text-2xl ">
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
                <Typography className="font-bold lg:text-4xl text-2xl">
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
              <Button className="w-full bg-[#A2241A] h-11 ">Book Now</Button>
              <div>
                <Typography className="font-bold lg:text-4xl text-2xl ">
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
                <Typography className="font-bold lg:text-4xl text-2xl ">
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