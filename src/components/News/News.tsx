import React from "react";
import Image from "next/image";
import s from './News.module.css'
import InnerHTML from 'dangerously-set-html-content'
import Share from "../ShareBtn/page";
interface NewsProps {
  id?: string;
  header?: string;
  content?: string;
  ownerId?: string;
  imageURL?: string;
}

const News: React.FC<NewsProps> = ({
  id,
  header,
  content,
  ownerId,
  imageURL
}) =>{

    return (
        <>
            <div className={s.con}>
                <div key={id} className={s.news}>
                    <h2 className={s.header}>{header}</h2>
                    <div className={s.userCon}>
                        <div className={s.user}>
                          {imageURL &&
                            <Image
                            className={s.userImg}
                            alt="user"
                            src={imageURL}
                            width={40}
                            priority={false} // {false} | {true}
                            height={40}
                            />
                          }
                            <div className={s.userName}>
                                <div>{ownerId}</div>
                                <div>{new Date().toLocaleDateString()}</div>
                            </div>
                        </div>
                        <div>
                            <Share/>
                        </div>
                    </div>
                    {content ? ( // Check if content is not null or undefined
                        <div className={s.content}><InnerHTML html={content} /></div>
                    ) : null}

                    {imageURL && 
                    <div className={s.contentImg}>
                        <Image
                            alt="content"
                            src={imageURL}
                            width={1000}
                            priority={false} // {false} | {true}
                            height={1000}
                            />
                    </div>
                      }
                </div>
            </div>
        </>
    );
};

export default News;
