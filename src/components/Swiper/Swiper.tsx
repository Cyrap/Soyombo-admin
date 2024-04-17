import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { getPosts } from '@/lib/posts';

interface News {
  id: string;
  header: string;
  content: string;
  ownerId: string;
  imageURL: string;
}

const useNews = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNews = await getPosts();
        setNews(fetchedNews);
      } catch (error) {
        console.error("Error fetching news: ", error);
      }
    };

    fetchData();
  }, []);

  return news;
};

const SwiperComponent = () => {
  const news = useNews();

  return (
    <div className="h-screen flex justify-center items-center bg-[#E5E5E5]">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          600: { slidesPerView: 2 },
          658: { slidesPerView: 3 },
          924: { slidesPerView: 3 },
          1100: { slidesPerView: 4 },
          1400: { slidesPerView: 5 },
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="rounded-2xl relative h-[50vh] overflow-hidden group border border-white border-opacity-30">
              <Image
                alt={item.header}
                src={item.imageURL}
                layout="fill"
                objectFit="cover"
                className="duration-700 ease-in-out group-hover:opacity-96 scale-100 blur-0 grayscale-0"
              />
              <div className="absolute bottom-0 left-0 right-0 text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-sm text-white">{item.header}</h3>
                {/* You can add more properties of News here */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
