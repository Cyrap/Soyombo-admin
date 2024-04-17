'use client'
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { ref, uploadBytes ,getDownloadURL} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'; 
import { updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { storage, db } from '../../firebase/firebase';
import Navbar from "@/components/Navbar/Navbar";
import { useUser } from "@/context/UserContext";
import { Spinner } from "@nextui-org/react";

const CarRegister = () => {
  const [fileUpload, setFileUpload] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useUser();
  const userId = user?.user?.uid;
  const productCollectionRef = collection(db, "Posts");

  const [formValues, setFormValues] = useState({
    newsDate:new Date(),
    newsImageURL:'https://www.nasa.gov/wp-content/uploads/2024/04/53641212344-be1e94e20c-o.jpg?resize=900,600',
    newsHeader:'',
    ownerId:'',
    newsContent:''
  });


  const onSubmitProduct = async () => {
    try {
      setIsSubmitting(true);

      const madeYearTimestamp = Timestamp.fromDate(new Date(formValues.newsDate));
      const news = {
        date: madeYearTimestamp,
        imageURL: formValues.newsImageURL,
        header: formValues.newsHeader,
        ownerId: userId,
        content: formValues.newsContent
      };
      const productRef = await addDoc(productCollectionRef, news);
      const imageUUID = uuidv4();
      const imageName = `${productRef.id}_${imageUUID}`;
      const fileFolderRef = ref(storage, `productImages/${imageName}`);
  
      if (fileUpload) {
        await uploadBytes(fileFolderRef, fileUpload)
        const imageURL = await getDownloadURL(fileFolderRef);
  
        await updateDoc(doc(db, "products", productRef.id), {
          imageURL: imageURL,
        });
        setFormValues({...formValues, newsImageURL:imageURL});
      }
  
      setFormValues({
        newsDate:new Date(),
        newsImageURL:'https://www.nasa.gov/wp-content/uploads/2024/04/53641212344-be1e94e20c-o.jpg?resize=900,600',
        newsHeader:'',
        ownerId:'',
        newsContent:'',
      });
  
      alert("Post successfully");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="max-w-md h-[100vh] mx-auto p-4 pt-[100px] space-y-4 items-center">
      <h3 className="text-lg font-semibold">Мэдээ оруулах</h3>
        <input
     className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
     placeholder="Гарчиг"
    value={formValues.newsHeader}
    type="text"
    onChange={(e) => setFormValues({...formValues, newsHeader:e.target.value})}
  />
<textarea
  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
  placeholder="Текст"
  value={formValues.newsContent}
  onChange={(e) => {
    const contentWithLineBreaks = e.target.value.replace(/\n/g, "<br>");
    setFormValues({...formValues, newsContent: contentWithLineBreaks});
  }}
/>

    <input type="file" onChange={(e) => {
          const selectedFile : File | null | any = e.target.files ? e.target.files[0] : null;
          setFileUpload(selectedFile );
        }} />
        <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onSubmitProduct}>
          {isSubmitting ? <Spinner /> : 'Submit'}
        </button>
      </div>
    </>
  );
};

export default CarRegister;
