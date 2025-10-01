import jsPDF from "jspdf";

export async function downloadTransactionPDF(transactionData: any) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4"
  });

  const logoUrl = "/bridgee-logo.png";
  const logoImg = await fetch(logoUrl)
    .then((res) => res.blob())
    .then(
      (blob) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        })
    );

  const maxWidth = 140;
  const maxHeight = 50;

  const pageWidth = doc.internal.pageSize.getWidth();
  const xPos = (pageWidth - maxWidth) / 2;
  doc.addImage(logoImg, "PNG", xPos, 30, maxWidth, maxHeight);

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Transaction Receipt", pageWidth / 2, 110, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  const startY = 150;
  const lineHeight = 22;

  const details = [
    `Amount: ${transactionData.amount}`,
    `Reference: ${transactionData.reference}`,
    `Channel: ${transactionData.channel}`,
    `Status: ${transactionData.status}`,
    `Type: ${transactionData.type}`,
    `Description: ${transactionData.description}`,
    `Date: ${transactionData.date}`,
    `Fee: ${transactionData.fee}`
  ];

  details.forEach((line, i) => {
    doc.text(line, 60, startY + i * lineHeight);
  });

  doc.save(`Receipt-${transactionData.reference}.pdf`);
}
