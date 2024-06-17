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
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const NovelContainer: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "90vw",
        margin: "auto",
        marginTop: "30px",
        gap: "20px",
        justifyContent: "center"
    }

    const getThumbnailStyle = (id: string): React.CSSProperties => ({
        height: "280px",
        width: "200px",
        margin: "0",
        padding: "0",
        cursor: "pointer",
        boxShadow: '5px 7px 5px rgba(0, 0, 0, 0.5)',
        transform: hoveredId === id ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.3s ease-in-out',
    });

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
        <div style={NovelContainer}>
            {novels.map((novel) => (
                <div key={novel.id}>
                    <img
                        src={novel.thumbnail}
                        alt={`Thumbnail for ${novel.id}`}
                        style={getThumbnailStyle(novel.id)}
                        onMouseEnter={() => setHoveredId(novel.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    />
                </div>
            ))}
        </div>
    );
};

export default DisplayThumbnails;
