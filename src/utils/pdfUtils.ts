import { getDocument } from 'pdfjs-dist';

export const extractTextFromPdf = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument(arrayBuffer).promise;
  let extractedText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');
    extractedText += pageText + '\n';
  }

  return extractedText;
};