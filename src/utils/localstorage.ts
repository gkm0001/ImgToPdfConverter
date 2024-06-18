export const getImageFromLocalStorage = () : string | null => {
      return localStorage.getItem('uploadedImage');
}

export const saveImageToLocalStorage = (image : string) => {
     localStorage.setItem('uploadedImage', image);
}

export const removeImageFromLocalStorage = () => {
     localStorage.removeItem('uploadedImage')
}