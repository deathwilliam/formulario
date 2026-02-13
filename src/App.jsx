import React from 'react';
import { SurveyForm } from './components/SurveyForm';
import {
  Smartphone,
  BookOpenCheck,
  Globe,
  ShieldCheck,
  Users,
  Briefcase,
  ExternalLink
} from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Refined Premium Header - Guaranteed Alignment */}
      <header className="bg-white border-b-4 border-[#00AFEF]/10 py-5 px-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-[#004C97] to-[#00AFEF] p-2.5 rounded-2xl shadow-lg shadow-blue-500/10 flex-shrink-0 flex items-center justify-center">
              <BookOpenCheck className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base sm:text-xl font-black text-[#004C97] leading-tight uppercase tracking-tight">
                Compromiso Digital
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <Users className="w-3 h-3 text-[#00AFEF]" />
                <p className="text-[9px] sm:text-[10px] text-[#00AFEF] font-black uppercase tracking-[0.25em]">
                  Plan International ES
                </p>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center gap-2 py-2 px-3 bg-slate-50 rounded-xl border-2 border-slate-100 shadow-sm">
            <Smartphone className="w-4 h-4 text-slate-400" />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest hidden sm:inline">Mobile Optimized</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        <SurveyForm />
      </main>

      {/* Professional Footer - Centered and Clean */}
      <footer className="bg-white border-t-4 border-slate-100 py-12 px-6 mt-12 shadow-inner">
        <div className="max-w-xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-[#00AFEF]" />
              <span className="text-sm font-black text-[#004C97] uppercase tracking-wider">Protección de Datos Garantizada</span>
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
              La información compartida se utiliza exclusivamente para el seguimiento técnico de los compromisos de transformación digital.
            </p>
          </div>

          <div className="py-8 border-y-2 border-slate-50 space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Briefcase className="w-5 h-5 text-slate-300" />
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Facilitación Técnica</span>
            </div>
            <p className="text-lg text-[#004C97] font-black italic tracking-tight">Ing. Wilfredo Melgar</p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-6">
              <span className="text-[12px] font-black text-[#004C97] tracking-tighter">PLAN INTERNATIONAL</span>
              <div className="w-[1.5px] h-4 bg-slate-200" />
              <span className="text-[12px] font-black text-slate-400 tracking-[0.2em]">EL SALVADOR 2024</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#00AFEF] font-extrabold uppercase tracking-[0.25em]">
              <div className="w-8 h-[2px] bg-[#00AFEF]/30" />
              Transformando el Futuro Digital
              <div className="w-8 h-[2px] bg-[#00AFEF]/30" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
