import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
import Lottie from "react-lottie";
import * as animationData from "../animation/ball.json";

export default function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Backdrop
        sx={{
          backgroundColor: "rgba(9, 132, 227,0.3)",
          backgroundOpacity: 0.5,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open
      >
        <Lottie options={defaultOptions} height={300} width={300} />
      </Backdrop>
    </div>
  );
}
