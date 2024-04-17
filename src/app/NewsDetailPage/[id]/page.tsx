'use client'
import { getPostData } from '../../../lib/post';
import News from '@/components/News/News';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
interface Params {
  id: string;
}

export default function NewsDetailPage({ params }: {
  params: Params;
}) {
  const id = params?.id;
  const news = getPostData(id);
  console.log(news);
  return (
    <div>
      {!id || !news ? (
        <div>Loading...</div>
      ) : (
        <>
        <Navbar/>
        <News {...news} />
        <Footer/>
        </>
      )}
    </div>
  );
}
