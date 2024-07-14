import React from "react";

const Split = () => {
  const sectionStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
  };

  const leftSectionStyle: React.CSSProperties = {
    ...sectionStyle,
    display: "flex",
    backgroundColor: "#302020",
    clipPath: "polygon(0 0, 20% 0, 80% 100%, 0% 100%)",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  };

  const rightSectionStyle: React.CSSProperties = {
    ...sectionStyle,
    display: "flex",
    backgroundColor: "#303030",
    clipPath: "polygon(20% 0, 100% 0, 100% 100%, 80% 100%)",
    zIndex: 0,
    alignItems: "center",
    justifyContent: "center",
  };

  const textContainer: React.CSSProperties = {
    position: "absolute",
    zIndex: 3,
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  };

  return (
    <div>
      <div style={leftSectionStyle}></div>
      <div style={rightSectionStyle}></div>
      <div style={textContainer}>
        <h1>Novel</h1>
        <h1>Manga</h1>
      </div>
    </div>
  );
};

export default Split;
