import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import s from './Posts.module.css'
import { query } from "firebase/firestore";
import { doc, collection, onSnapshot, getDocs, where } from "firebase/firestore"
import { db } from "@/firebase/firebase";
import DeleteBtn from "../DeleteDoc/page";
import TableTest from "../TableTest/page"
interface News {
    id: string,
    header: string,
    content: string,
    ownerId: string,
    imageURL: string
}

const Posts = () => {
    const router = useRouter();

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

    const handleNavigation = (id: any) => {
        router.push(`/NewsDetailPage/${id}`);
    }

    const handlePostDelete = (deletedPostId: string) => {
        // Filter out the deleted post from the state
        setNews(news.filter(item => item.id !== deletedPostId));
    }

    return (
        <>
            <div className={s.con}>
                <TableTest/>
                {news.map((item) => (
                    <div key={item.id} className="flex flex-row justify-between border-10">
                        <div key={item.id} className={s.news} onClick={() => { handleNavigation(item.id) }}>
                            <div className={s.contentImg}>
                                <Image
                                    alt="content"
                                    className="rounded-md"
                                    src={item.imageURL}
                                    width={100}
                                    height={100}
                                    />
                            </div>
                            <h2 className={s.header}>{item.header}</h2>
                        </div>
                        <DeleteBtn postId={item.id} onDelete={handlePostDelete} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Posts;
