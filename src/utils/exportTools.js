import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';

export const generateExcel = (data) => {
    const toolsData = Object.entries(data.tools).map(([id, status]) => ({
        Herramienta: id,
        Estado: status
    }));

    const summaryData = [
        ["Campo", "Valor"],
        ["Nombre del Emprendimiento", data.businessName],
        ["Ubicación", data.location],
        ["Etapa Actual", data.currentStage],
        ["Metas de Tiempo", data.commitmentTime],
        ["Primer Paso", data.firstStep],
        ["Desafíos", data.challenges.join(', ')],
        ["Impacto Esperado", data.impact],
        ["Fecha de Registro", data.date]
    ];

    const wb = XLSX.utils.book_new();
    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    const wsTools = XLSX.utils.json_to_sheet(toolsData);

    XLSX.utils.book_append_sheet(wb, wsSummary, "Resumen");
    XLSX.utils.book_append_sheet(wb, wsTools, "Herramientas");

    XLSX.writeFile(wb, `Reporte_Digital_${data.businessName.replace(/\s+/g, '_')}.xlsx`);
};

export const generatePDF = async (data) => {
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
    });

    const primaryColor = [0, 76, 151]; // #004C97
    const accentColor = [0, 175, 239]; // #00AFEF

    // Header
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('REPORTE DE COMPROMISO DIGITAL', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Alfabetización Digital para Emprendedores - Plan International', 105, 30, { align: 'center' });

    let y = 55;
    doc.setTextColor(33, 33, 33);

    // I. Status
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('I. Estado de Implementación', 20, y);
    y += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Emprendimiento: ${data.businessName}`, 25, y);
    y += 7;
    doc.text(`Ubicación: ${data.location}`, 25, y);
    y += 7;
    doc.text(`Etapa Actual: ${data.currentStage}`, 25, y);
    y += 15;

    // II. Tools
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('II. Diagnóstico de Herramientas', 20, y);
    y += 10;
    doc.setFontSize(10);
    Object.entries(data.tools).forEach(([tool, status]) => {
        doc.setFont('helvetica', 'bold');
        doc.text(`${tool}:`, 25, y);
        doc.setFont('helvetica', 'normal');
        doc.text(status, 120, y);
        y += 7;
    });
    y += 10;

    // III, IV, V
    const sections = [
        { title: 'III. Compromiso de Acción', fields: [`Meta: ${data.commitmentTime}`, `Primer Paso: ${data.firstStep}`] },
        { title: 'IV. Desafíos', fields: [`Desafíos detectados: ${data.challenges.join(', ')}`] },
        { title: 'V. Impacto Esperado', fields: [`Beneficio principal: ${data.impact}`] }
    ];

    sections.forEach(section => {
        if (y > 250) { doc.addPage(); y = 20; }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(section.title, 20, y);
        y += 10;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        section.fields.forEach(f => {
            const lines = doc.splitTextToSize(f, 160);
            doc.text(lines, 25, y);
            y += (lines.length * 7);
        });
        y += 10;
    });

    // Footer
    y = 275;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Facilitador: Ing. Wilfredo Melgar | Fecha de Registro: ${data.date}`, 105, y, { align: 'center' });

    doc.save(`Reporte_Digital_${data.businessName.replace(/\s+/g, '_')}.pdf`);
};
