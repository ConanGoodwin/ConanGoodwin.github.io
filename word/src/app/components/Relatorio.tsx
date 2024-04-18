'use client';
import montaDoc from "@/utils/montaDoc";
import { saveAs } from "file-saver";
import { Packer } from "docx";

export default function Relatorio() {
  const geraDoc = async () => {
    const doc = await montaDoc();
  
    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }

  return (
    <button onClick={geraDoc}>
      RELATORIO
    </button>
  )
}
