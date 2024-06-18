import React, { useState, useEffect } from "react";
import {
  HiBars3,
  HiArrowDownCircle,
  HiMiniChevronDoubleDown,
  HiMiniBookOpen,
  HiPhoto,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/isi.png";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [isBarsIcon, setIsBarsIcon] = useState(true);

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
    position: "relative",
    zIndex: 100,
  };

  const iconStyle: React.CSSProperties = {
    height: "50%",
    width: "auto",
    padding: "0px 20px 0px 20px",
    cursor: "pointer",
    userSelect: "none",
  };

  const iconStyleSide: React.CSSProperties = {
    marginTop: "10px",
    height: "auto",
    width: "60%",
    maxWidth: "80px",
    cursor: "pointer",
    userSelect: "none",
  };

  const sideBarStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "90vh",
    width: isMenuOpen ? (isMobile ? "100vw" : "90px") : "0",
    opacity: isMenuOpen ? "1" : "0",
    transition: "width 0.3s, opacity 0.3s",
    backgroundColor: "#242424",
    position: "absolute",
    boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.5)",
    zIndex: 99,
    overflow: "hidden",
  };

  const openMenu = () => {
    setMenuOpen(!isMenuOpen);
    setIsBarsIcon(!isBarsIcon);
  };

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goDownload = () => {
    navigate("/download");
  };

  const goNovel = () => {
    navigate("/novel");
  };

  const goManga = () => {
    navigate("/manga");
  };

  return (
    <>
      <div style={topBarStyle} className="topBar">
        {isBarsIcon ? (
          <HiBars3 onClick={openMenu} style={iconStyle} />
        ) : (
          <HiMiniChevronDoubleDown onClick={openMenu} style={iconStyle} />
        )}
        <img src={Logo} alt="Logo" style={iconStyle} onClick={goHome} />
        <HiArrowDownCircle style={iconStyle} onClick={goDownload} />
      </div>
      <div style={sideBarStyle} className="sideBar">
        <HiMiniBookOpen
          style={iconStyleSide}
          onClick={() => {
            goNovel();
            openMenu();
          }}
        />
        <HiPhoto
          style={iconStyleSide}
          onClick={() => {
            goManga();
            openMenu();
          }}
        />
      </div>
    </>
  );
};

export default Navbar;
