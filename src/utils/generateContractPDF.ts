import { jsPDF } from 'jspdf';

interface ContractData {
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  signatureDataUrl: string;
}

export function generateContractPDF(data: ContractData): string {
  const doc = new jsPDF();
  
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let yPos = 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('ДОГОВОР № _____', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 10;
  doc.setFontSize(12);
  doc.text('на оказание услуг по вывозу бытовых отходов', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  const contractDate = new Date().toLocaleDateString('ru-RU');
  doc.text(`г. [Город], ${contractDate}`, margin, yPos);
  
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Заказчик:', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(data.clientName, margin + 30, yPos);
  
  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Телефон:', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(data.clientPhone, margin + 30, yPos);
  
  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Адрес:', margin, yPos);
  doc.setFont('helvetica', 'normal');
  const addressLines = doc.splitTextToSize(data.clientAddress, maxWidth - 30);
  doc.text(addressLines, margin + 30, yPos);
  yPos += addressLines.length * 7;
  
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('1. Предмет договора', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  const subjectText = '1.1. Исполнитель обязуется оказывать услуги по вывозу бытовых отходов от двери Заказчика до мусорного контейнера согласно условиям настоящего договора.';
  const subjectLines = doc.splitTextToSize(subjectText, maxWidth);
  doc.text(subjectLines, margin, yPos);
  yPos += subjectLines.length * 5;
  
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('2. Условия оказания услуг', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  
  const conditions = [
    '2.1. График оказания услуг: понедельник, среда, суббота с 10:00 до 17:00',
    '2.2. Максимальный вес отходов за один раз: до 10 кг',
    '2.3. Допустимые виды отходов: только бытовой мусор',
    '2.4. Стоимость услуг: 650 (Шестьсот пятьдесят) рублей в месяц',
    '2.5. Оплата производится до 5 числа текущего месяца'
  ];
  
  conditions.forEach(condition => {
    const lines = doc.splitTextToSize(condition, maxWidth);
    doc.text(lines, margin, yPos);
    yPos += lines.length * 5 + 2;
  });
  
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('3. Ответственность сторон', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  const responsibilityText = '3.1. Стороны несут ответственность за неисполнение или ненадлежащее исполнение обязательств по настоящему договору в соответствии с действующим законодательством Российской Федерации.';
  const respLines = doc.splitTextToSize(responsibilityText, maxWidth);
  doc.text(respLines, margin, yPos);
  yPos += respLines.length * 5;
  
  yPos += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('Подпись Заказчика:', margin, yPos);
  
  yPos += 5;
  if (data.signatureDataUrl) {
    try {
      doc.addImage(data.signatureDataUrl, 'PNG', margin, yPos, 60, 20);
    } catch (error) {
      console.error('Error adding signature to PDF:', error);
    }
  }
  
  yPos += 25;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Дата: ${contractDate}`, margin, yPos);
  
  const pdfBlob = doc.output('blob');
  return URL.createObjectURL(pdfBlob);
}

export function generateContractPDFBase64(data: ContractData): string {
  const doc = new jsPDF();
  
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let yPos = 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('ДОГОВОР № _____', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 10;
  doc.setFontSize(12);
  doc.text('на оказание услуг по вывозу бытовых отходов', pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 15;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  const contractDate = new Date().toLocaleDateString('ru-RU');
  doc.text(`г. [Город], ${contractDate}`, margin, yPos);
  
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Заказчик:', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(data.clientName, margin + 30, yPos);
  
  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Телефон:', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(data.clientPhone, margin + 30, yPos);
  
  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Адрес:', margin, yPos);
  doc.setFont('helvetica', 'normal');
  const addressLines = doc.splitTextToSize(data.clientAddress, maxWidth - 30);
  doc.text(addressLines, margin + 30, yPos);
  yPos += addressLines.length * 7;
  
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('1. Предмет договора', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  const subjectText = '1.1. Исполнитель обязуется оказывать услуги по вывозу бытовых отходов от двери Заказчика до мусорного контейнера согласно условиям настоящего договора.';
  const subjectLines = doc.splitTextToSize(subjectText, maxWidth);
  doc.text(subjectLines, margin, yPos);
  yPos += subjectLines.length * 5;
  
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('2. Условия оказания услуг', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  
  const conditions = [
    '2.1. График оказания услуг: понедельник, среда, суббота с 10:00 до 17:00',
    '2.2. Максимальный вес отходов за один раз: до 10 кг',
    '2.3. Допустимые виды отходов: только бытовой мусор',
    '2.4. Стоимость услуг: 650 (Шестьсот пятьдесят) рублей в месяц',
    '2.5. Оплата производится до 5 числа текущего месяца'
  ];
  
  conditions.forEach(condition => {
    const lines = doc.splitTextToSize(condition, maxWidth);
    doc.text(lines, margin, yPos);
    yPos += lines.length * 5 + 2;
  });
  
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('3. Ответственность сторон', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  const responsibilityText = '3.1. Стороны несут ответственность за неисполнение или ненадлежащее исполнение обязательств по настоящему договору в соответствии с действующим законодательством Российской Федерации.';
  const respLines = doc.splitTextToSize(responsibilityText, maxWidth);
  doc.text(respLines, margin, yPos);
  yPos += respLines.length * 5;
  
  yPos += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('Подпись Заказчика:', margin, yPos);
  
  yPos += 5;
  if (data.signatureDataUrl) {
    try {
      doc.addImage(data.signatureDataUrl, 'PNG', margin, yPos, 60, 20);
    } catch (error) {
      console.error('Error adding signature to PDF:', error);
    }
  }
  
  yPos += 25;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Дата: ${contractDate}`, margin, yPos);
  
  const pdfBase64 = doc.output('dataurlstring').split(',')[1];
  return pdfBase64;
}
