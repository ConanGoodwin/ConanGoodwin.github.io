import { saveAs } from "file-saver";
import { AlignmentType, Document, Footer, Header, HeadingLevel, ImageRun, PageNumber, Paragraph, TextRun, UnderlineType } from "docx";
import { table, table2, table3 } from "./docComponents/tables";
import { montaImgFundo, montaImgLogo, primaryImage } from "./docComponents/images";


export default async function montaDoc() {
  const doc = new Document({
    sections: [
      {
        headers: {
          default: new Header({
            children: [new Paragraph("Gerado através da biblioteca docx de node.")],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    children: ["Page #: ", PageNumber.CURRENT, " of ", PageNumber.TOTAL_PAGES],
                  })
                ],
                alignment: AlignmentType.RIGHT,
              })
            ],
          }),
        },
        children: [
          new Paragraph({
            text: "Stats",
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            spacing: {
              before: 250,
            },
            children: [
              new TextRun({
                text: "Relatório teste gerado através da biblioteca npm ",
                bold: true,
              }),
              new TextRun({
                text: "DOCX",
                bold: true,
                underline: {
                  type: UnderlineType.DOUBLE,
                  color: "990011",
                },
              }),
              new TextRun({
                text: " inserido texto e imagem formatados em tabelas, listas e parágrafos, além de gerar uma copia da imagem renomeada.",
                bold: true,
              }),
              new TextRun({
                text: "A ideia é que todos os dados venham de uma fonte JSON ou banco de dados.",
                bold: true,
                break: 2
              }),
            ],
          }),
          new Paragraph({
            children: [
              await montaImgFundo()
            ],
            alignment: AlignmentType.CENTER
          }),
          new Paragraph({
            children: [
              await montaImgLogo()
            ]
          }),
          new Paragraph("_________________________________________________________________________________________"),
          new Paragraph({
              text: "Bullet points",
              bullet: {
                  level: 0 // How deep you want the bullet to be. Maximum level is 9
              }
          }),
          new Paragraph({
              text: "Are awesome",
              bullet: {
                  level: 0
              },
          }),
          new Paragraph({
            text: "",
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [
            new TextRun({
              text: "TABELAS",
              break: 1,
              underline: {
                type: UnderlineType.SINGLE,
                color: "005d99",
              },
            })
          ]
        }),
        new Paragraph({ text: "Table with skewed widths" }),
        table,
        new Paragraph({ text: "Table with equal widths" }),
        table2,
        new Paragraph({ text: "Table without setting widths" }),
        table3
        ]
      }
    ]
  });
  saveAs(await primaryImage(), "nomeModificado.jpeg");

  return doc;
}