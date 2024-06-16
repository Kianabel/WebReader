import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase-config';

interface Novel {
    id: string;
    thumbnail: string;
    author: string;
    chapter_count: number;
    title: string;
}

const DisplayThumbnails = () => {
    const [novels, setNovels] = useState<Novel[]>([]);

    useEffect(() => {
        const fetchNovels = async () => {
            const collectionRef = collection(db, "novel");
            const querySnapshot = await getDocs(collectionRef);
            const novelsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                thumbnail: doc.data().thumbnail,
                author: doc.data().author,
                title: doc.data().title,
                chapter_count: doc.data().chapter_count
            }));
            setNovels(novelsData);
        };

        fetchNovels();
    }, []);

    return (
        <div>
            {novels.map((novel) => (
                <div key={novel.id}>
                    <img src={novel.thumbnail} alt={`Thumbnail for ${novel.id}`} />
                </div>
            ))}
        </div>
    );
};

export default DisplayThumbnails;
