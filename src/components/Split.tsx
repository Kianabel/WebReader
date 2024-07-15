import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { HiMiniBookOpen, HiPhoto } from "react-icons/hi2";

const Split = () => {
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [leftZIndex, setLeftZIndex] = useState(1);

  const navigate = useNavigate();

  const goNovel = () => {
    navigate("/novel");
  };

  const goManga = () => {
    navigate("/manga");
  };

  useEffect(() => {
    let leftTimer: ReturnType<typeof setTimeout>;
    if (isLeftHovered) {
      leftTimer = setTimeout(() => setLeftZIndex(2), 190);
    } else {
      leftTimer = setTimeout(() => setLeftZIndex(1), 500);
    }
    return () => clearTimeout(leftTimer);
  }, [isLeftHovered]);

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
    backgroundColor: "#342424",
    clipPath: isLeftHovered
      ? "polygon(0 0, 40% 0, 100% 100%, 0% 100%)"
      : "polygon(0 0, 20% 0, 80% 100%, 0% 100%)",
    boxShadow: isLeftHovered ? "0 4px 20px rgba(0, 0, 0, 0.3)" : "none",
    zIndex: leftZIndex,
    alignItems: "center",
    justifyContent: "center",
    opacity: isLeftHovered ? 1 : 0.6,
    cursor: "pointer",
  };

  const rightSectionStyle: React.CSSProperties = {
    ...sectionStyle,
    display: "flex",
    backgroundColor: "#342424",
    clipPath: isRightHovered
      ? "polygon(0% 0, 100% 0, 100% 100%, 60% 100%)"
      : "polygon(20% 0, 100% 0, 100% 100%, 80% 100%)",
    boxShadow: isRightHovered ? "0 4px 20px rgba(0, 0, 0, 0.3)" : "none",
    zIndex: isRightHovered ? 2 : 1,
    alignItems: "center",
    justifyContent: "center",
    opacity: isRightHovered ? 1 : 0.6,
    cursor: "pointer",
  };

  const leftTextContainer: React.CSSProperties = {
    position: "absolute",
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
    width: "40%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    left: 0,
    opacity: isLeftHovered ? "100%" : "50%",
    fontSize: "20px"
  };

  const rightTextContainer: React.CSSProperties = {
    position: "absolute",
    zIndex: 3,
    display: "flex",
    flexDirection: "column",
    width: "40%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    right: 0,
    opacity: isRightHovered ? "100%" : "50%",
    fontSize: "20px"
  };
  
  const cardIcon: React.CSSProperties = {
    height: "20%",
    width: "20%",
    justifyContent: "center",
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
          <h1>Novel</h1>
          <HiMiniBookOpen style={cardIcon} />
        </div>
        <div style={rightTextContainer}>
          <h1>Manga</h1>
          <HiPhoto style={cardIcon} />
        </div>
      </div>
    </div>
  );
};

export default Split;
