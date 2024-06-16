import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../firebase-config'; // Ensure db is being imported correctly from where it's initialized

interface Novel {
    id: string;
    thumbnail: string; // Adjust the type based on your actual data structure
}

const DisplayThumbnails = () => {
    const [novels, setNovels] = useState<Novel[]>([]);

    useEffect(() => {
        const fetchNovels = async () => {
            const collectionRef = collection(db, "novel");
            const querySnapshot = await getDocs(collectionRef);
            const novelsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                thumbnail: doc.data().thumbnail // Ensure the 'thumbnail' field is a string or adjust the type accordingly
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
