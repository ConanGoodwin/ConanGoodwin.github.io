'use client'
import { AlignmentType, Paragraph, Table, TableCell, TableRow, WidthType } from "docx";

export const table = new Table({
  columnWidths: [3505, 5505],
  rows: [
      new TableRow({
          children: [
              new TableCell({
                  width: {
                      size: 3505,
                      type: WidthType.DXA,
                  },
                  children: [new Paragraph("Hello")],
              }),
              new TableCell({
                  width: {
                      size: 5505,
                      type: WidthType.DXA,
                  },
                  children: [],
              }),
          ],
      }),
      new TableRow({
          children: [
              new TableCell({
                  width: {
                      size: 3505,
                      type: WidthType.DXA,
                  },
                  children: [],
              }),
              new TableCell({
                  width: {
                      size: 5505,
                      type: WidthType.DXA,
                  },
                  children: [new Paragraph("World")],
              }),
          ],
      }),
  ],
});

export const table2 = new Table({
  columnWidths: [4505, 4505],
  rows: [
      new TableRow({
          children: [
              new TableCell({
                  width: {
                      size: 4505,
                      type: WidthType.DXA,
                  },
                  children: [new Paragraph("Hello")],
              }),
              new TableCell({
                  width: {
                      size: 4505,
                      type: WidthType.DXA,
                  },
                  children: [],
              }),
          ],
      }),
      new TableRow({
          children: [
              new TableCell({
                  width: {
                      size: 4505,
                      type: WidthType.DXA,
                  },
                  children: [],
              }),
              new TableCell({
                  width: {
                      size: 4505,
                      type: WidthType.DXA,
                  },
                  children: [new Paragraph("World")],
              }),
          ],
      }),
  ],
});

export const table3 = new Table({
  rows: [
      new TableRow({
          children: [
              new TableCell({
                  children: [new Paragraph("Hello")],
              }),
              new TableCell({
                  children: [],
              }),
          ],
      }),
      new TableRow({
          children: [
              new TableCell({
                  children: [],
              }),
              new TableCell({
                  children: [new Paragraph("World")],
              }),
          ],
      }),
  ],
  alignment: AlignmentType.CENTER,
});