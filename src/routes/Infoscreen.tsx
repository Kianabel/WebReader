import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "../../firebase-config";
import Divider from "../components/Divider";

interface InfoContent {
  id: string;
  thumbnail: string;
  author: string;
  chapter_count: number;
  title: string;
  desc: string;
}

interface Chapter {
  id: string;
  chapter_name: string;
}

const NovelInfo = () => {
  const { type, title } = useParams<"type" | "title">();
  const [info, setInfo] = useState<InfoContent | null>(null);
  const [chapter, setNovels] = useState<Chapter[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);


  const navigate = useNavigate()
  const goChapter = (chapterId: string) => {
    navigate(`/${type}/${title}/${chapterId}`);
  };  
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => { // retrieve basic Info
    const fetchInfo = async () => {
      if (type && title) {
        const docRef = doc(db, `${type}/${title}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInfo(docSnap.data() as InfoContent);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchInfo();
  }, [type, title]);

  useEffect(() => { // retrieve Chapters
    const fetchChapter = async () => {
      const collectionRef = collection(db, `${type}/${title}/chapter`);
      const querySnapshot = await getDocs(collectionRef);
      const novelsData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          chapter_name: doc.data().chapter_name,
        }))
        .filter((chapter) => chapter.chapter_name !== "Placeholder"); // Filter out chapters with the name "Placeholder"
      setNovels(novelsData);
    };

    fetchChapter();
  }, [type, title]);

  const overflowWrapper: React.CSSProperties = {
    overflowX: "hidden",
  };

  const novelBanner: React.CSSProperties = {
    position: "relative",
    display: "flex",
    width: "100vw",
    height: "auto",
    minHeight: "70vh",
    alignItems: "center",
    overflow: "hidden",
    zIndex: -2,
    margin: isMobile ? "0 0 15px 0" : "auto",
  };

  const contentWrapper: React.CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    justifyContent: "center",
  };

  const blurredBackground: React.CSSProperties = {
    backgroundImage: `url(${info?.thumbnail})`,
    display: "flex",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    filter: "blur(50px)",
    zIndex: -1,
  };

  const infoContainer: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: isMobile ? "100%" : "50%",
    height: "80%",
  };

  const imgBanner: React.CSSProperties = {
    height: isMobile ? "225px" : "450px",
    width: isMobile ? "157px" : "314px",
    borderRadius: "10px",
    boxShadow: "5px 7px 5px rgba(0, 0, 0, 0.2)",
    margin: isMobile ? "20px 0 20px 0" : "0 50px 0 0",
  };

  const headlineStyle: React.CSSProperties = {
    fontSize: isMobile ? "25px" : "",
    display: "flex",
    padding: "5px",
    background: "#303030",
    borderRadius: "10px",
    border: "5px solid #242424",
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    margin: isMobile ? "0 0 0 0" : "0 0 20px 0",
  };

  const ulStatStyle: React.CSSProperties = {
    listStyle: "none",
    display: "flex",
    padding: "5px",
    background: "#303030",
    borderRadius: "10px",
    border: "5px solid #242424",
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.3)",
    justifyContent: "space-around",
    gap: "10px",
  };

  const summaryStyle: React.CSSProperties = {
    background: "#303030",
    padding: "5px",
    borderRadius: "10px",
    border: "5px solid #242424",
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.3)",
    width: isMobile ? "" : "",
    margin: isMobile ? "0 0 0 0" : "auto",
  };

  const flexContainer: React.CSSProperties = {
    margin: "20px 0 0 0",
    display: "flex",
    flexWrap: "wrap",
    gap: '10px',
    justifyContent: "center",
  };

  const chapterWrapper: React.CSSProperties = {
    borderRadius: '10px',
    width:"45vw",
    cursor: "pointer",
    backgroundColor: "#242424",
  };

  const ulStyle: React.CSSProperties = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  };

  const liStyle: React.CSSProperties = {
    padding: '5px',
    margin: "0px",
    backgroundColor: "#181818",
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.3)",
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  };

  const liStyle2: React.CSSProperties = {
    padding: '5px',
    margin: "1px",
  };

  return (
    <>
      <div style={overflowWrapper}>
        <Navbar />
        <div style={novelBanner}>
          <div style={blurredBackground}></div>
          <div style={contentWrapper}>
            <img src={info?.thumbnail} alt="tf" style={imgBanner} />
            <div style={infoContainer}>
              <h1 style={headlineStyle}>{info?.title}</h1>
              <div>
                <ul style={ulStatStyle}>
                  <li>
                    <strong>Chapters:</strong> {info?.chapter_count}
                  </li>
                  <li>
                    <strong>Author:</strong> {info?.author}
                  </li>
                </ul>
              </div>
              <div style={summaryStyle}>
                <h2>Summary:</h2>
                <p>{info?.desc}</p>
              </div>
            </div>
          </div>
        </div>
        <Divider section="Chapters:" />
        <div style={flexContainer}>
          {chapter.map((chapter) => (
            <div key={chapter.id} style={chapterWrapper} onClick={() => goChapter(chapter.id)}> 
              <ul style={ulStyle}>
                <li style={liStyle}>Chapter: {chapter.id}</li>
                <li style={liStyle2}>{chapter.chapter_name}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NovelInfo;
