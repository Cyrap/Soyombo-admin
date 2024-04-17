import { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface News {
    id: string;
    header: string;
    content: string;
    ownerId: string;
    imageURL: string;
}

export function getPostData(id: string) {
    const [news, setNews] = useState<News | null>(null);
    useEffect(() => {
        const fetchNews = async () => {
            if (id) {
                try {
                    const newsDocRef = doc(db, "Posts", id);
                    const newsDocSnapshot = await getDoc(newsDocRef);
                    if (newsDocSnapshot.exists()) {
                        const newsData = newsDocSnapshot.data();
                        setNews({
                            id: newsDocSnapshot.id,
                            header: newsData.header,
                            content: newsData.content,
                            ownerId: newsData.ownerId,
                            imageURL: newsData.imageURL
                        });
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching document: ", error);
                }
            }
        };

        fetchNews();
    }, [id]);

    return {
        id,
        ...news,
    };
}
