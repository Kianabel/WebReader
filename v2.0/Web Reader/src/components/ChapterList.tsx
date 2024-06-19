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
  }, []);

  return (
    <>
      {chapter.map((chapter) => (
        <div key={chapter.id}>
          <p>
            Chapter:{chapter.id} - {chapter.chapter_name}
          </p>
        </div>
      ))}
    </>
  );
};

export default ChapterList;
