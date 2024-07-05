import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";

import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Tlogo from "@/assets/images/logo/Tumatar SVG 1.svg";
const MobileLogo = () => {
  const [isDark] = useDarkMode();
  return (
    <Link to="/">
      <img src={isDark ? Tlogo : Tlogo} alt="" />
    </Link>
  );
};

export default MobileLogo;
