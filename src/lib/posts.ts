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

export async function getPosts(): Promise<News[]> {
    const [news, setNews] = useState<News[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const newsDocRef = doc(db, "Posts");
                const newsDocSnapshot = await getDoc(newsDocRef);
                if (newsDocSnapshot.exists()) {
                    const newsData = newsDocSnapshot.data();
                    const newNewsItem: News = {
                        id: newsDocSnapshot.id,
                        header: newsData.header,
                        content: newsData.content,
                        ownerId: newsData.ownerId,
                        imageURL: newsData.imageURL
                    };
                    setNews(prevNews => [...prevNews, newNewsItem]);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        fetchNews();
    }, []);

    return news; // Return the promise of News[]
}
