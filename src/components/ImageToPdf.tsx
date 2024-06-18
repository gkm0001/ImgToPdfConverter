import jsPDF from 'jspdf';
import './ImageToPdf.css'
import React, { useEffect, useRef, useState } from 'react'
import { getImageFromLocalStorage , saveImageToLocalStorage,removeImageFromLocalStorage } from '../utils/localstorage';



const ImageToPdf: React.FC = () => {


  useEffect(() => {
    const storedImage = getImageFromLocalStorage();
    if (storedImage) {
      setImageSrc(storedImage);
    }
  }, []);

  const [ imagesrc , setImageSrc] = useState < string | null > (null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (event : React.ChangeEvent<HTMLInputElement>)=> {
   
    const file = event.target.files?.[0];

    if(file) {

      //1 step 
      const reader = new FileReader();
       //3rd step
       reader.onload = (e) => {
        // console.log(e);
        
          setImageSrc(e.target?.result as string);
          saveImageToLocalStorage(e.target?.result as string);
      };
          
      //2 step
      reader.readAsDataURL(file) 
    }
}

  const DownloadPdf = () => {
    const input = imageRef.current;
    
    

    if (input) {
      const imageUrl = input.src;

      const pdf = new jsPDF('p', 'mm', 'a4');
      const img = new Image();
      img.src = imageUrl;

      img.onload = function () {

        console.log(pdf);
        
        const imgWidth = pdf.internal.pageSize.getWidth(); 

        const imgHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imageUrl, 'PNG', 0, 0, imgWidth, imgHeight);

        pdf.save('download.pdf');

      };
    }
  };

  const clearImage = () => {
    setImageSrc(null);
    removeImageFromLocalStorage();
  };


  return (
    <div className='parent'>
      <input type='file' accept="image/*" onChange={handleImageUpload} className='inputParent' />
      {imagesrc && (
        <div className='imageParent'>
          <img ref={imageRef} src={imagesrc} alt="Uploaded" />
          <button onClick={clearImage} className='clearButton'>Clear Image</button>
        </div>
      )}
      <button onClick={DownloadPdf} disabled={!imagesrc} className='button'>Download as Pdf</button>
    </div>
  )
}

export default ImageToPdf

