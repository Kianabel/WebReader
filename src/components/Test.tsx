import React, { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight, HiBookOpen } from "react-icons/hi";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase-config";
import { useParams } from "react-router-dom";

interface Chapter {
  id: string;
  chapter_name: string;
  chapter_content: string;
}

const TextReader = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const { type, title, chapterNumber } = useParams<"type" | "title" | "chapterNumber">();
  const [getChapter, setChapter] = useState<Chapter | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  useEffect(() => { // retrieve chapter
    const fetchInfo = async () => {
      if (type && title && chapterNumber) {
        const docRef = doc(db, `${type}/${title}/${chapterNumber}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setChapter(docSnap.data() as Chapter);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchInfo();
  }, [type, title, chapterNumber]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseEnter = (button: string) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
    setClickedButton(null);
  };

  const handleMouseDown = (button: string) => {
    setClickedButton(button);
  };

  const handleMouseUp = () => {
    setClickedButton(null);
  };

  const getButtonStyle = (button: string) => {
    let backgroundColor = "#d91c1c";

    if (clickedButton === button) {
      backgroundColor = "#a11212"; // Darker color on click
    } else if (hoveredButton === button) {
      backgroundColor = "#b51818"; // Darker color on hover
    }

    return {
      height: "45px",
      width: "90px",
      borderRadius: "10px",
      border: "none",
      backgroundColor,
      color: "white",
      fontSize: "15px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
  };

  const AlignContent: React.CSSProperties = {
    width: "fit-content",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    margin: isMobile ? "30px auto" : "0 auto",
    backgroundColor: isMobile ? "inherit" : "#242424",
    padding: isMobile ? "0px" : "30px",
    borderRadius: isMobile ? "0" : "10px",
  };

  const ButtonContainer: React.CSSProperties = {
    display: "flex",
    gap: isMobile ? "40px" : "190px",
  };

  const ContentStyle: React.CSSProperties = {
    textAlign: "left",
    width: isMobile ? "350px" : "650px",
  };

  const content : string | TrustedHTML = getChapter?.chapter_content || "<p>The Chapter you are looking for is not available</p>"

  return (
    <>
      <div style={AlignContent}>
        <div style={ButtonContainer}>
          <button
            style={getButtonStyle("prev")}
            onMouseEnter={() => handleMouseEnter("prev")}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => handleMouseDown("prev")}
            onMouseUp={handleMouseUp}
          >
            <HiChevronLeft size={30} />
          </button>
          <button
            style={getButtonStyle("home")}
            onMouseEnter={() => handleMouseEnter("home")}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => handleMouseDown("home")}
            onMouseUp={handleMouseUp}
          >
            <HiBookOpen size={25} />
          </button>
          <button
            style={getButtonStyle("next")}
            onMouseEnter={() => handleMouseEnter("next")}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => handleMouseDown("next")}
            onMouseUp={handleMouseUp}
          >
            <HiChevronRight size={30} />
          </button>
        </div>
        <div
          style={ContentStyle}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <div style={ButtonContainer}>
          <button
            style={getButtonStyle("prev2")}
            onMouseEnter={() => handleMouseEnter("prev2")}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => handleMouseDown("prev2")}
            onMouseUp={handleMouseUp}
          >
            <HiChevronLeft size={30} />
          </button>
          <button
            style={getButtonStyle("home2")}
            onMouseEnter={() => handleMouseEnter("home2")}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => handleMouseDown("home2")}
            onMouseUp={handleMouseUp}
          >
            <HiBookOpen size={25} />
          </button>
          <button
            style={getButtonStyle("next2")}
            onMouseEnter={() => handleMouseEnter("next2")}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => handleMouseDown("next2")}
            onMouseUp={handleMouseUp}
          >
            <HiChevronRight size={30} />
          </button>
        </div>
      </div>
    </>
  );
};

export default TextReader;
