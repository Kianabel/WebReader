import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

const Split = () => {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);

  const navigate = useNavigate();

  const goNovel = () => {
    navigate("/novel");
  };

  const goManga = () => {
    navigate("/manga");
  };

  const handleMouseEnter = (side: string) => {
    if (side === "left") {
      setIsLeftHovered(true);
    } else if (side === "right") {
      setIsRightHovered(true);
    }
  };

  const handleMouseLeave = (side: string) => {
    if (side === "left") {
      setIsLeftHovered(false);
    } else if (side === "right") {
      setIsRightHovered(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    overflow: "hidden",
    height: "100vh",
    position: "relative",
  };

  const mainContentStyle: React.CSSProperties = {
    height: "calc(100vh - 7vh)", // Adjust the navbar height here if necessary
    position: "relative",
  };

  const sectionStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    transition: "clip-path 0.5s ease, transform 0.5s ease, box-shadow 0.5s ease, opacity 0.5s ease",
  };

  const leftSectionStyle: React.CSSProperties = {
    ...sectionStyle,
    display: "flex",
    backgroundColor: "#d91c1c",
    clipPath: isLeftHovered
      ? "polygon(0 0, 45% 0, 75% 100%, 0% 100%)"
      : "polygon(0 0, 35% 0, 65% 100%, 0% 100%)",
    boxShadow: isLeftHovered ? "0 4px 20px rgba(0, 0, 0, 0.3)" : "none",
    zIndex: isLeftHovered ? 3:1,
    alignItems: "center",
    justifyContent: "center",
    opacity: isLeftHovered ? 1 : 0.6,
    cursor: "pointer",
  }

  const rightSectionStyle: React.CSSProperties = {
    ...sectionStyle,
    display: "flex",
    backgroundColor: "#303030",
    clipPath: isRightHovered
      ? "polygon(25% 0, 100% 0, 100% 100%, 55% 100%)"
      : "polygon(35% 0, 100% 0, 100% 100%, 65% 100%)",
    boxShadow: isRightHovered ? "0 4px 20px rgba(0, 0, 0, 0.3)" : "none",
    zIndex: isRightHovered ? 3:1,
    alignItems: "center",
    justifyContent: "center",
    opacity: isRightHovered ? 1 : 0.6,
    cursor: "pointer",
  };

  const leftTextContainer: React.CSSProperties = {
    position: "absolute",
    zIndex: 3,
    pointerEvents: "none",
    opacity: isLeftHovered ? "100%" : "50%",
    fontSize: "65px",
    bottom: "-120px",
    left: "1vw",
  };

  const rightTextContainer: React.CSSProperties = {
    position: "absolute",
    zIndex: 3,
    pointerEvents: "none",
    opacity: isRightHovered ? "100%" : "50%",
    fontSize: "65px",
    top: "-120px",
    right: "1vw",
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={mainContentStyle}>
        <div
          style={leftSectionStyle}
          onMouseEnter={() => handleMouseEnter("left")}
          onMouseLeave={() => handleMouseLeave("left")}
          onClick={goNovel}
        ></div>
        <div
          style={rightSectionStyle}
          onMouseEnter={() => handleMouseEnter("right")}
          onMouseLeave={() => handleMouseLeave("right")}
          onClick={goManga}
        ></div>
        <div style={leftTextContainer}>
          <h1>NOVEL</h1>
        </div>
        <div style={rightTextContainer}>
          <h1>MANGA</h1>
        </div>
      </div>
    </div>
  );
};

export default Split;
