import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2,
    MapPin,
    Rocket,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    FileSpreadsheet,
    FileDown,
    ShieldCheck,
    Target,
    AlertTriangle,
    Zap,
    Info,
    Beaker
} from 'lucide-react';
import { generatePDF, generateExcel } from '../utils/exportTools';

const STEPS = [
    { id: 'start', title: 'I. Información General' },
    { id: 'diagnostic', title: 'II. Diagnóstico' },
    { id: 'commitment', title: 'III. Compromiso de Acción' },
    { id: 'challenges', title: 'IV. Desafíos' },
    { id: 'impact', title: 'V. Impacto Esperado' },
];

export const SurveyForm = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        businessName: '',
        location: '',
        currentStage: '',
        tools: {},
        commitmentTime: '',
        firstStep: '',
        challenges: [],
        impact: '',
        date: new Date().toLocaleDateString(),
    });

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateTool = (toolId, state) => {
        setFormData(prev => ({
            ...prev,
            tools: { ...prev.tools, [toolId]: state }
        }));
    };

    const toggleChallenge = (challenge) => {
        setFormData(prev => ({
            ...prev,
            challenges: prev.challenges.includes(challenge)
                ? prev.challenges.filter(c => c !== challenge)
                : [...prev.challenges, challenge]
        }));
    };

    const fillTestData = () => {
        setFormData({
            businessName: 'Mi Negocio de Prueba',
            location: 'Las Vueltas',
            currentStage: 'Ya implementado: Herramientas activadas.',
            tools: TOOLS.reduce((acc, tool) => ({ ...acc, [tool.id]: 'Implementada' }), {}),
            commitmentTime: 'En los próximos 3 días.',
            firstStep: 'Realizar inventario digital y organizar fotos.',
            challenges: ['Falta de tiempo.'],
            impact: 'Mayor alcance y ventas.',
            date: new Date().toLocaleDateString(),
        });
        setCurrentStep(STEPS.length - 1); // Go to final step to see results
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const renderStep = () => {
        switch (STEPS[currentStep].id) {
            case 'start':
                return (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-[#004C97] font-heading">Estado de Implementación</h2>
                            <p className="text-slate-500">Datos generales de su proyecto digital.</p>
                            <button
                                type="button"
                                onClick={fillTestData}
                                className="mt-2 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold py-1 px-3 rounded-full flex items-center gap-2 mx-auto transition-all"
                            >
                                <Beaker className="w-3 h-3" />
                                RELENAR CON DATOS DE PRUEBA
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Nombre del Emprendimiento</label>
                                <input
                                    type="text"
                                    value={formData.businessName}
                                    onChange={(e) => updateField('businessName', e.target.value)}
                                    placeholder="Escriba el nombre aquí..."
                                    className="input-field"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 ml-1">Ubicación</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Las Vueltas', 'Ojos de Agua'].map(loc => (
                                        <div
                                            key={loc}
                                            onClick={() => updateField('location', loc)}
                                            className={`radio-card ${formData.location === loc ? 'radio-card-selected' : ''}`}
                                        >
                                            <MapPin className={`w-5 h-5 mr-3 ${formData.location === loc ? 'text-[#00AFEF]' : 'text-slate-400'}`} />
                                            <span className="font-bold text-slate-700">{loc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 ml-1">¿En qué etapa se encuentra actualmente?</label>
                                <div className="space-y-3">
                                    {[
                                        { id: 'implemented', label: 'Ya implementado: Herramientas activadas.', icon: CheckCircle2 },
                                        { id: 'in_process', label: 'En proceso: Activando esta semana.', icon: Rocket },
                                        { id: 'committed', label: 'Comprometido: Fecha definida para inicio.', icon: ShieldCheck },
                                    ].map(stage => (
                                        <div
                                            key={stage.id}
                                            onClick={() => updateField('currentStage', stage.label)}
                                            className={`radio-card ${formData.currentStage === stage.label ? 'radio-card-selected' : ''}`}
                                        >
                                            <stage.icon className={`w-6 h-6 mr-4 flex-shrink-0 ${formData.currentStage === stage.label ? 'text-[#00AFEF]' : 'text-slate-400'}`} />
                                            <span className="text-sm font-bold text-slate-700">{stage.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'diagnostic':
                return (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-[#004C97] font-heading">Diagnóstico</h2>
                            <p className="text-slate-500 italic">Marque el estado de cada herramienta según su realidad actual.</p>
                        </div>

                        <div className="space-y-5 max-h-[55vh] overflow-y-auto pr-2 custom-scrollbar">
                            {TOOLS.map(tool => (
                                <div key={tool.id} className="p-5 bg-white rounded-3xl border-2 border-slate-50 shadow-sm space-y-4">
                                    <p className="text-sm font-extrabold text-[#004C97]">{tool.label}</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { id: 'done', label: 'Implementada' },
                                            { id: 'soon', label: 'Pronto' },
                                            { id: 'none', label: 'No interesa' },
                                        ].map(status => (
                                            <button
                                                key={status.id}
                                                type="button"
                                                onClick={() => updateTool(tool.id, status.label)}
                                                className={`text-[10px] uppercase tracking-tighter font-black py-3 px-1 rounded-xl border-2 transition-all ${formData.tools[tool.id] === status.label
                                                    ? 'bg-[#004C97] border-[#004C97] text-white'
                                                    : 'bg-white border-slate-100 text-slate-400'
                                                    }`}
                                            >
                                                {status.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'commitment':
                return (
                    <div className="space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-[#004C97] font-heading">Compromiso de Acción</h2>
                            <p className="text-slate-500">¿Cuál es su meta para tener estas herramientas?</p>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-700 ml-1">Meta de Tiempo</label>
                                <div className="space-y-3">
                                    {['En los próximos 3 días.', 'En la próxima semana.', 'En los próximos 15 días.'].map(time => (
                                        <div
                                            key={time}
                                            onClick={() => updateField('commitmentTime', time)}
                                            className={`radio-card ${formData.commitmentTime === time ? 'radio-card-selected' : ''}`}
                                        >
                                            <Target className={`w-6 h-6 mr-4 ${formData.commitmentTime === time ? 'text-[#00AFEF]' : 'text-slate-400'}`} />
                                            <span className="font-bold text-slate-700">{time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                                    <Info className="w-4 h-4 text-[#00AFEF]" />
                                    ¿Qué es lo primero que hará al llegar para avanzar?
                                </label>
                                <textarea
                                    value={formData.firstStep}
                                    onChange={(e) => updateField('firstStep', e.target.value)}
                                    placeholder="Ej: Revisar mi contraseña de Gmail..."
                                    className="input-field min-h-[140px] resize-none"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'challenges':
                return (
                    <div className="space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-[#004C97] font-heading">Desafíos</h2>
                            <p className="text-slate-500">¿Qué le impide (o impidió) avanzar?</p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    'Necesito más práctica técnica.',
                                    'Problemas con el celular (memoria).',
                                    'Mala conexión a internet.',
                                    'Falta de tiempo.',
                                ].map(challenge => (
                                    <div
                                        key={challenge}
                                        onClick={() => toggleChallenge(challenge)}
                                        className={`radio-card ${formData.challenges.includes(challenge) ? 'radio-card-selected' : ''}`}
                                    >
                                        <AlertTriangle className={`w-5 h-5 mr-3 ${formData.challenges.includes(challenge) ? 'text-[#00AFEF]' : 'text-slate-400'}`} />
                                        <span className="text-xs font-bold text-slate-700">{challenge}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'impact':
                return (
                    <div className="space-y-8">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-[#004C97] font-heading">Impacto Esperado</h2>
                            <p className="text-slate-500">¿Qué beneficio principal espera obtener?</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                {[
                                    'Más orden y ahorro de tiempo.',
                                    'Mayor alcance y ventas.',
                                    'Seguridad de mi información.',
                                    'Imagen más profesional.',
                                ].map(impact => (
                                    <div
                                        key={impact}
                                        onClick={() => updateField('impact', impact)}
                                        className={`radio-card ${formData.impact === impact ? 'radio-card-selected' : ''}`}
                                    >
                                        <Zap className={`w-5 h-5 mr-4 ${formData.impact === impact ? 'text-[#00AFEF]' : 'text-slate-400'}`} />
                                        <span className="font-bold text-slate-700">{impact}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const isCurrentStepValid = () => {
        switch (STEPS[currentStep].id) {
            case 'start': return formData.businessName && formData.location && formData.currentStage;
            case 'diagnostic': return Object.keys(formData.tools).length >= 4;
            case 'commitment': return formData.commitmentTime && formData.firstStep;
            case 'challenges': return formData.challenges.length > 0;
            case 'impact': return formData.impact;
            default: return false;
        }
    };

    const safeGeneratePDF = () => {
        const finalData = {
            ...formData,
            businessName: formData.businessName || 'Emprendedor sin nombre',
        };
        generatePDF(finalData);
    };

    const safeGenerateExcel = () => {
        const finalData = {
            ...formData,
            businessName: formData.businessName || 'Emprendedor sin nombre',
        };
        generateExcel(finalData);
    };

    return (
        <div className="max-w-xl mx-auto py-10 px-4 flex flex-col min-h-screen">
            <div className="mb-10">
                <div className="flex justify-between items-end mb-4 px-2">
                    <div>
                        <p className="text-[10px] font-black text-[#00AFEF] uppercase tracking-[0.2em] mb-1">Encuesta de Compromiso</p>
                        <h1 className="text-xl font-black text-[#004C97] uppercase leading-none font-heading">Alfabetización Digital</h1>
                    </div>
                    <span className="text-xs font-black text-slate-300 uppercase">Paso {currentStep + 1}/{STEPS.length}</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden border-2 border-white shadow-inner">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[#004C97] to-[#00AFEF]"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="form-card flex-grow flex flex-col justify-between min-h-[500px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>

                <div className="mt-12 space-y-4">
                    <div className="flex gap-4">
                        {currentStep > 0 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="btn-secondary flex-1"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Atrás
                            </button>
                        )}

                        {currentStep < STEPS.length - 1 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!isCurrentStepValid()}
                                className="btn-primary flex-[2]"
                            >
                                Continuar
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 w-full">
                                <button
                                    type="button"
                                    onClick={safeGeneratePDF}
                                    className="btn-primary bg-[#004C97]"
                                >
                                    <FileDown className="w-5 h-5" />
                                    PDF
                                </button>
                                <button
                                    type="button"
                                    onClick={safeGenerateExcel}
                                    className="btn-primary bg-[#107C41] border-none shadow-green-900/10"
                                >
                                    <FileSpreadsheet className="w-5 h-5" />
                                    Excel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 mb-10 text-center">
                <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em]">Acceso rápido a reportes</p>
                <div className="grid grid-cols-2 gap-4 w-full">
                    <button
                        onClick={safeGeneratePDF}
                        className="text-[11px] font-black text-[#004C97] bg-white py-4 rounded-3xl border-4 border-[#004C97]/5 flex items-center justify-center gap-3 hover:bg-[#004C97]/5 transition-all shadow-sm"
                    >
                        <FileDown className="w-5 h-5" />
                        VISTA PDF
                    </button>
                    <button
                        onClick={safeGenerateExcel}
                        className="text-[11px] font-black text-[#107C41] bg-white py-4 rounded-3xl border-4 border-[#107C41]/5 flex items-center justify-center gap-3 hover:bg-[#107C41]/5 transition-all shadow-sm"
                    >
                        <FileSpreadsheet className="w-5 h-5" />
                        VISTA EXCEL
                    </button>
                </div>
            </div>
        </div>
    );
};
