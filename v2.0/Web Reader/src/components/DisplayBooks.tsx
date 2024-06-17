import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import db from "../../firebase-config";

interface Novel {
  id: string;
  thumbnail: string;
  author: string;
  chapter_count: number;
  title: string;
}

const DisplayBooks = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { type } = useParams<"type">();

  const NovelContainer: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90vw",
    margin: "auto",
    marginTop: "30px",
    gap: "20px",
    justifyContent: "center",
  };

  const getThumbnailStyle = (id: string): React.CSSProperties => ({
    height: "280px",
    width: "200px",
    margin: "0",
    padding: "0",
    cursor: "pointer",
    boxShadow: "5px 7px 5px rgba(0, 0, 0, 0.5)",
    transform: hoveredId === id ? "scale(1.1)" : "scale(1)",
    transition: "transform 0.3s ease-in-out",
  });

  useEffect(() => {
    const fetchNovels = async () => {
        let collectionRef
      if (type == "novel") {
        collectionRef = collection(db, "novel");
      } else {
        collectionRef = collection(db, "manga");
      }
        const querySnapshot = await getDocs(collectionRef);
        const novelsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          thumbnail: doc.data().thumbnail,
          author: doc.data().author,
          title: doc.data().title,
          chapter_count: doc.data().chapter_count,
        }));
        setNovels(novelsData);
    };

    fetchNovels();
  }, []);

  const navigate = useNavigate();

  const goInfo = (title: string) => {
    const currentPath = window.location.pathname;
    navigate(currentPath + `/${title}`);
  };

  return (
    <div style={NovelContainer}>
      {novels.map((novel) => (
        <div key={novel.id}>
          <img
            src={novel.thumbnail}
            alt={"Loading. . ."}
            style={getThumbnailStyle(novel.id)}
            onMouseEnter={() => setHoveredId(novel.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => goInfo(novel.title)}
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayBooks;
