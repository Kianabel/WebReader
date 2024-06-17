import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebase-config";

interface InfoContent {
  id: string;
  thumbnail: string;
  author: string;
  chapter_count: number;
  title: string;
  desc: string;
}

const NovelInfo = () => {
  const { type, title } = useParams<"type" | "title">();
  const [info, setInfo] = useState<InfoContent | null>(null);

  console.log(type, title)

  useEffect(() => {
    const fetchChapter = async () => {
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

    fetchChapter();
  }, [type, title]);

  return (
    <>
    <Navbar/>
    <img src={info?.thumbnail} alt="tf" />
    </>
  );
};

export default NovelInfo;
