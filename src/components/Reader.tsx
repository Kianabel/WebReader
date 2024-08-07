import React, { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight, HiBookOpen } from "react-icons/hi";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase-config";
import { useNavigate, useParams } from "react-router-dom";

const TextReader = () => {
  interface Chapter {
    id: string;
    chapter_name: string;
    chapter_content: string;
  }

  interface ChapterInfo {
    id: string;
    thumbnail: string;
    author: string;
    chapter_count: number;
    title: string;
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const { type, title, chapterNumber } = useParams<
    "type" | "title" | "chapterNumber"
  >();
  const [getChapter, setChapter] = useState<Chapter | null>(null);
  const [getChapterInfo, setChapterInfo] = useState<ChapterInfo | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  let [scrollProgress, setScrollProgress] = useState(0);

  const navigate = useNavigate();

  const goPrev = () => {
    const prevChapter: number = Number(chapterNumber) - 1;
    if (prevChapter < 0) {
      navigate(`/${type}/${title}`);
    } else {
      navigate(`/${type}/${title}/${prevChapter}`);
    }
    window.scrollTo({ top: 0});
  };

  const goNovel = () => {
    navigate(`/${type}/${title}`);
    window.scrollTo({ top: 0});
  };

  const goNext = () => {
    const nextChapter: number = Number(chapterNumber) + 1;
    if (nextChapter >= (getChapterInfo?.chapter_count || 0)) {
      navigate(`/${type}/${title}`);
    } else {
      navigate(`/${type}/${title}/${nextChapter}`);
    }
    window.scrollTo({ top: 0});
  };

  useEffect(() => {
    // retrieve chapter
    const fetchChapter = async () => {
      if (type && title && chapterNumber) {
        const docRef = doc(db, `${type}/${title}/chapter/${chapterNumber}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const chapterData = docSnap.data() as Chapter;
          if (chapterData.chapter_content === "Placeholder") {
            navigate(`/${type}/${title}`);
          } else {
            setChapter(chapterData);
          }
        } else {
          console.log("No such document!");
          goPrev()
        }
      }
    };

    fetchChapter();
  }, [type, title, chapterNumber, navigate]);

  useEffect(() => {
    // retrieve maxChapter
    const fetchChapterInfo = async () => {
      if (type && title) {
        const docRef = doc(db, `${type}/${title}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setChapterInfo(docSnap.data() as ChapterInfo);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchChapterInfo();
  }, [type, title]);

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

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setScrollProgress(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getButtonStyle = (button: string) => {
    let backgroundColor = "#d91c1c";

    if (clickedButton === button) {
      backgroundColor = "#8b1212"; // Darker color on click
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
      transition: "background-color 0.05s",
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

  const ProgressBar: React.CSSProperties = {
    position: "fixed",
    bottom: "0",
    left: "0",
    height: "5px",
    width: `${scrollProgress}%`,
    backgroundColor: `rgba(${scrollProgress * 2.55}, 0, 0)`,
    transition: "width 0.25s, background-color 0.25s",
    boxShadow: "0 0 8px rgba(255, 0, 0, 0.8)",
  };

  const content: string = getChapter?.chapter_content || "";

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
            onClick={() => goPrev()}
          >
            <HiChevronLeft size={30} />
          </button>
          <button
            style={getButtonStyle("home")}
            onMouseEnter={() => handleMouseEnter("home")}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => handleMouseDown("home")}
            onMouseUp={handleMouseUp}
            onClick={() => goNovel()}
          >
            <HiBookOpen size={25} />
          </button>
          <button
            style={getButtonStyle("next")}
            onMouseEnter={() => handleMouseEnter("next")}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => handleMouseDown("next")}
            onMouseUp={handleMouseUp}
            onClick={() => goNext()}
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
            onClick={() => goPrev()}
          >
            <HiChevronLeft size={30} />
          </button>
          <button
            style={getButtonStyle("home2")}
            onMouseEnter={() => handleMouseEnter("home2")}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => handleMouseDown("home2")}
            onMouseUp={handleMouseUp}
            onClick={() => goNovel()}
          >
            <HiBookOpen size={25} />
          </button>
          <button
            style={getButtonStyle("next2")}
            onMouseEnter={() => handleMouseEnter("next2")}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => handleMouseDown("next2")}
            onMouseUp={handleMouseUp}
            onClick={() => goNext()}
          >
            <HiChevronRight size={30} />
          </button>
        </div>
      </div>
      <div style={ProgressBar}></div>
    </>
  );
};

export default TextReader;
