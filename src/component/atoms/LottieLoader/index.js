"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import classes from "./LottieLoader.module.css";
import PropTypes from "prop-types";

const LottieLoader = ({ className }) => {
  return (
    <div className={`${classes?.container} ${className && className}`}>
      <Player
        autoplay
        loop
        src={"/lottie/loadingSecondary.json"}
        style={{ height: "300px", width: "300px" }}
      ></Player>
    </div>
  );
};

export default LottieLoader;


LottieLoader.propTypes = {
  className: PropTypes.string,
};