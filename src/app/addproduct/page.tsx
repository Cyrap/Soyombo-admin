'use client'
import React, { useState, useEffect } from "react";
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
import {Input,Select, SelectItem,Textarea,Button} from "@nextui-org/react";
const CarRegister = () => {
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState('');
  const [categoryType, setCategoryType] = useState<string[]>([]);
  const [about, setAbout] = useState('');
  const [formValues, setFormValues] = useState({
    newsDate:new Date(),
    newsImageURL:'',
    newsHeader:'',
    ownerId:'',
    newsContent:'',
  });

  const user = useUser();
  const userId = user?.user?.uid;
  const productCollectionRef = collection(db, "Posts");

  const onSubmitProduct = async () => {
    try {
      setIsSubmitting(true);

      const madeYearTimestamp = Timestamp.fromDate(new Date(formValues.newsDate));
      const news = {
        date: madeYearTimestamp,
        imageURL: formValues.newsImageURL,
        header: formValues.newsHeader,
        ownerId: userId,
        content: formValues.newsContent,
        category: category,
        about: about
      };
      const productRef = await addDoc(productCollectionRef, news);
      const imageUUID = uuidv4();
      const imageName = `${productRef.id}_${imageUUID}`;
      const fileFolderRef = ref(storage, `newsImages/${imageName}`);
  
      if (fileUpload) {
        await uploadBytes(fileFolderRef, fileUpload)
        const imageURL = await getDownloadURL(fileFolderRef);
  
        await updateDoc(doc(db, "Posts", productRef.id), {
          imageURL: imageURL,
        });
        setFormValues({...formValues, newsImageURL:imageURL});
      }
  
      setFormValues({
        newsDate:new Date(),
        newsImageURL:'',
        newsHeader:'',
        ownerId:'',
        newsContent:''
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    switch(category){
      case "sport":
        setCategoryType(["basketball", "soccer","golf"]);
        break;
      case "politics":
        setCategoryType(["health","criminal","etc"]);
        break;
      // Add cases for other categories
      default:
        setCategoryType([]);
    }
  }, [category]);

  const categoryOptions = [
    {label: "Спорт", value: "sport"},
    {label: "Улс төр", value: "politics"},
    ];
  return (
    <>
      <div className="max-w-md mx-auto p-4 pt-[100px] space-y-4 items-center">
        <h3 className="text-lg font-semibold">Мэдээ оруулах</h3>
        <Input type="text" label="Гарчиг" 
         value={formValues.newsHeader}
         onChange={(e) => setFormValues({...formValues, newsHeader:e.target.value})}
        />

        <Select 
        onChange={(e) => setCategory(e.target.value)}
        label="Select an animal" 
        className="max-w-xs" 
      >
        {categoryOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>


      <Select 
       onChange={(e)=>setAbout(e.target.value)}
        label="Төрөл" 
        className="max-w-xs" 
      >
        {categoryType.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </Select>


 
    <Textarea
       label="Текст"
          className="w-full"
          placeholder="Текст"
          value={formValues.newsContent}
          onChange={(e) => {
            const contentWithLineBreaks = e.target.value.replace(/\n/g, "<br>");
            setFormValues({...formValues, newsContent: contentWithLineBreaks});
          }}
        />
        <Input type="file" onChange={(e) => {
          const selectedFile = e.target.files ? e.target.files[0] : null;
          setFileUpload(selectedFile);
        }}
        className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
      "
        />
        <Button color="primary" variant="bordered" onClick={onSubmitProduct}>
        {isSubmitting ? <Spinner /> : 'Submit'}
      </Button>  
      </div>
    </>
  );
};

export default CarRegister;
