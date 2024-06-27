import { HiMiniBookOpen, HiPhoto } from "react-icons/hi2";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function App() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const cardContainer: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    width: "90vw",
    margin: "auto",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  };

  const getCardStyle = (id: string): React.CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    height: "280px",
    width: "200px",
    justifyContent: "center",
    border: "2px solid #181818",
    borderRadius: "10px",
    boxShadow: "7px 8px 5px rgba(0, 0, 0, 0.5)",
    cursor: "pointer",
    transform: hoveredId === id ? "scale(1.1)" : "scale(1)",
    transition: "transform 0.3s ease-in-out",
  });

  const cardIcon: React.CSSProperties = {
    height: "80%",
    width: "80%",
    justifyContent: "center",
    margin: "auto",
  };

  const h1Style: React.CSSProperties = {
    textAlign: "center",
    height: "20%",
    width: "auto",
    margin: "0 0 0 0",
    padding: "5px",
    backgroundColor: "#181818",
    boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.4)",
  };

  const navigate = useNavigate();

  const goNovel = () => {
    navigate("/novel");
  };

  const goManga = () => {
    navigate("/manga");
  };

  return (
    <>
      <Navbar />
      <div className="contentContainer">
        <div style={cardContainer}>
          <div
            style={getCardStyle("novel")}
            onClick={goNovel}
            onMouseEnter={() => setHoveredId("novel")}
            onMouseLeave={() => setHoveredId(null)}
          >
            <h1 style={h1Style}>Novel</h1>
            <HiMiniBookOpen style={cardIcon} />
          </div>
          <div
            style={getCardStyle("manga")}
            onClick={goManga}
            onMouseEnter={() => setHoveredId("manga")}
            onMouseLeave={() => setHoveredId(null)}
          >
            <h1 style={h1Style}>Manga</h1>
            <HiPhoto style={cardIcon} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
