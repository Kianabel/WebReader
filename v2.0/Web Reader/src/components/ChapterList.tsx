import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import db from "../../firebase-config";

interface Chapter {
  id: string;
  chapter_name: string;
}

const ChapterList = () => {
  const [chapter, setNovels] = useState<Chapter[]>([]);
  const { type, title } = useParams<"type" | "title">();
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

  useEffect(() => {
    const fetchChapter = async () => {
      const collectionRef = collection(db, `${type}/${title}/chapter`);
      const querySnapshot = await getDocs(collectionRef);
      const novelsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        chapter_name: doc.data().chapter_name,
      }));
      setNovels(novelsData);
    };

    fetchChapter();
  }, [type, title]);


  const chapterListWrapper: React.CSSProperties = {
    margin: "auto"
  }

  return (
    <div style={chapterListWrapper}>
      {chapter.map((chapter) => (
        <div key={chapter.id}>
          <p>Chapter: {chapter.id}</p>
          <p>{chapter.chapter_name}</p>
        </div>
      ))}
    </div>
  );
};

export default ChapterList;
