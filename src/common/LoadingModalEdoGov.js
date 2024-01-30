import { Modal, Typography } from "@mui/material";
import edologo from "images/EdoLogo.svg";

import LoadingIndicator from "./LoadingIndicator";

/**
 *
 * @param {import("@mui/material").ModalProps} props
 */
export function LoadingModalEdoGov(props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen" {...props}>
      {/* <LoadingIndicator /> */}
      <div className="">
        <img
          src={edologo}
          alt="Rotating Image"
          className="animate-spin w-32 "
        />
        <Typography className="text-center font-bold mt-4" variant="h5">
          Loading...
        </Typography>
      </div>
    </div>
  );
}

export default LoadingModalEdoGov;
