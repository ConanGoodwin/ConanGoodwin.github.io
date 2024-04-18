export default function getBase64ImageFromURL(url: string) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Esta função só pode ser executada no lado do cliente'));
      return;
    }

    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
  
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
  
      const ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0);
  
      const dataURL = canvas.toDataURL("image/png");
  
      resolve(dataURL);
    };
  
    img.onerror = error => {
      reject("errooo: " + error);
    };

    img.src = url;
  });
}
