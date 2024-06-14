import React, { useState, useEffect } from "react";
import Logo from "../assets/insifuchs.png";
import { HiBars3, HiArrowDownCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const topBarStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "10vh",
    width: "100vw",
    backgroundColor: "#242424",
    boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.5)",
  };

  const iconStyle: React.CSSProperties = {
    height: "50%",
    width: "auto",
    padding: "0px 20px 0px 20px",
    cursor: "pointer",
    userSelect: "none",
  };

  const sideBarStyle: React.CSSProperties = {
    height: "90vh",
    width: isMenuOpen ? (isMobile ? "100vw" : "5vw") : "0",
    opacity: isMenuOpen ? "1" : "0",
    transition: "width 0.3s, opacity 0.3s",
    backgroundColor: "#242424",
    position: "absolute",
    boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.5)",
  };

  const openMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goDownload = () => {
    navigate("/download");
  };

  return (
    <>
      <div style={topBarStyle} className="topBar">
        <HiBars3 onClick={openMenu} style={iconStyle} />
        <img src={Logo} alt="Logo" style={iconStyle} onClick={goHome} />
        <HiArrowDownCircle style={iconStyle} />
      </div>
      <div style={sideBarStyle} className="sideBar"></div>
    </>
  );
};

export default Navbar;
