import React, { useEffect, useState } from "react";
import Image from "next/image";

import s from './Posts.module.css'
import { query } from "firebase/firestore";
import { doc, collection, onSnapshot, getDocs, where } from "firebase/firestore"
import { db } from "@/firebase/firebase";
import DeleteBtn from "../DeleteDoc/page";
import TableTest from "../Table/page"
interface News {
    id: string,
    header: string,
    content: string,
    ownerId: string,
    imageURL: string
}

const Posts = () => {
    const [news, setNews] = useState<News[]>([]);
    const newsCollectionRef = collection(db, "Posts");
    useEffect(() => {
        const getNews = async () => {
            try {
                const q = query(newsCollectionRef);
                const data = await getDocs(q);
                const filteredData: any = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setNews(filteredData);
                console.log(filteredData);
            } catch (err) {
                console.log(err);
            }
        }
        getNews();
    }, [])

    const handlePostDelete = (deletedPostId: string) => {
        setNews(news.filter(item => item.id !== deletedPostId));
    }
    return (
        <>
            <div className={s.con}>
                <TableTest param={news}/>
            </div>
        </>
    );
};

export default Posts;
