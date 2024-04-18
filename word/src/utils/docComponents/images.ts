'use client'
import { ImageRun, Packer, TextWrappingSide, TextWrappingType } from "docx";
import getBase64ImageFromURL from "../getBase64ImageFromURL";
import fundo from "../../../public/fundo.png";
import logo from "../../../public/antiplay_logo.jpeg";

// export const image: string = await getBase64ImageFromURL('./public/antiplay_logo.jpeg') as string

async function getImageBase64(urlImage: string) {
  // Verifica se o código está sendo executado no navegador antes de chamar a função
  if (typeof window !== 'undefined') {
    const url = urlImage; // URL da imagem que você quer converter
    try {
      const base64Image = await getBase64ImageFromURL(url);
      return base64Image;
    } catch (error) {
      console.error('Erro ao converter imagem para base64:', error);
      return null;
    }
  }
}


export async function montaImgFundo(): Promise<ImageRun> {
  const imgFundoData = await getImageBase64(await fetch(fundo.src)
  .then(response => response.url));

  return new ImageRun({
    data: imgFundoData as string,
    transformation: {
      width: 600,
      height: 900
    },
    floating: {
      horizontalPosition: {
        offset: 900000,
      },
      verticalPosition: {
        offset: 1000000,
      },
      behindDocument: true,
      zIndex: -1
    },
  })
}

export async function montaImgLogo(): Promise<ImageRun> {
  const imgLogoData = await getImageBase64(await fetch(logo.src)
  .then(response => response.url));

  return new ImageRun({
    data: imgLogoData as string,
    transformation: {
      width: 100,
      height: 100
    },
    floating: {
      horizontalPosition: {
          offset: 700000,
      },
      verticalPosition: {
          offset: 1300000,
      },
      wrap: {
          type: TextWrappingType.SQUARE,
          side: TextWrappingSide.RIGHT,
      },
      margins: {
        right: 200000,
      },
      zIndex: 2
    },
  })
}

export async function primaryImage(): Promise<string >{
  return await getImageBase64(await fetch(logo.src)
  .then(response => response.url)) as string;
} 