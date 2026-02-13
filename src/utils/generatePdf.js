import { jsPDF } from 'jspdf';

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
    doc.text('REPORT DE IMPLEMENTACIÓN', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Programa: Alfabetización Digital para Emprendedores', 105, 30, { align: 'center' });

    // Content
    let y = 55;
    doc.setTextColor(33, 33, 33);

    // Business Info
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('I. Información del Emprendimiento', 20, y);
    y += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`Nombre: ${data.businessName}`, 25, y);
    y += 7;
    doc.text(`Ubicación: ${data.location}`, 25, y);
    y += 7;
    doc.text(`Estado Actual: ${data.currentStage}`, 25, y);
    y += 15;

    // Tools Table
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('II. Diagnóstico de Herramientas', 20, y);
    y += 10;

    doc.setFillColor(245, 247, 250);
    doc.rect(20, y - 5, 170, 7, 'F');
    doc.setFontSize(10);
    doc.text('Herramienta', 25, y);
    doc.text('Estado', 150, y);
    y += 10;

    doc.setFont('helvetica', 'normal');
    Object.entries(data.tools).forEach(([tool, status]) => {
        const labels = {
            google_pro: 'Cuenta Google Profesional',
            cloud_backup: 'Respaldo en la Nube',
            calendar: 'Agenda Digital',
            keep: 'Notas e Inventario',
            '2fa': 'Seguridad 2FA',
            fb_business: 'Facebook Business',
            ig_tiktok: 'Instagram / TikTok',
            photo_edit: 'Edición de Fotos',
        };

        doc.text(labels[tool] || tool, 25, y);
        if (status === 'Implementada') doc.setTextColor(...primaryColor);
        else if (status === 'Pronto') doc.setTextColor(...accentColor);
        else doc.setTextColor(150, 150, 150);

        doc.text(status, 150, y);
        doc.setTextColor(33, 33, 33);
        y += 7;
    });

    y += 10;

    // Commitment
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('III. Compromiso de Acción', 20, y);
    y += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`Meta de tiempo: ${data.commitmentTime}`, 25, y);
    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.text('Primer paso a seguir:', 25, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.firstStep, 160);
    doc.text(lines, 25, y);
    y += (lines.length * 6) + 10;

    // Challenges
    doc.setFont('helvetica', 'bold');
    doc.text('IV. Desafíos e Impacto', 20, y);
    y += 10;
    doc.setFontSize(10);
    doc.text('Desafíos identificados:', 25, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(data.challenges.join(', '), 25, y);
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Beneficio esperado:', 25, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(data.impact, 25, y);

    // Footer
    y = 250;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, y, 190, y);
    y += 15;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Compromiso de Implementación Digital', 20, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Fecha de Registro: ${data.date}`, 150, y, { align: 'right' });

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Plan International - Programa de Alfabetización Digital', 105, 285, { align: 'center' });

    doc.save(`Reporte_Digital_${data.businessName.replace(/\s+/g, '_')}.pdf`);
};
