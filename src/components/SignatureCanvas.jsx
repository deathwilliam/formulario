import React, { useRef, useEffect } from 'react';
import SignaturePad from 'signature_pad';
import { Eraser, Check } from 'lucide-react';

export const SignatureCanvas = ({ onSave, onClear }) => {
    const canvasRef = useRef(null);
    const signaturePadRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            signaturePadRef.current = new SignaturePad(canvasRef.current, {
                backgroundColor: 'rgb(255, 255, 255)',
                penColor: 'rgb(0, 76, 151)', // plan-blue
            });

            const resizeCanvas = () => {
                const ratio = Math.max(window.devicePixelRatio || 1, 1);
                canvasRef.current.width = canvasRef.current.offsetWidth * ratio;
                canvasRef.current.height = canvasRef.current.offsetHeight * ratio;
                canvasRef.current.getContext("2d").scale(ratio, ratio);
                signaturePadRef.current.clear();
            };

            window.addEventListener("resize", resizeCanvas);
            resizeCanvas();

            return () => {
                window.removeEventListener("resize", resizeCanvas);
            };
        }
    }, []);

    const handleClear = () => {
        signaturePadRef.current.clear();
        if (onClear) onClear();
    };

    const handleSave = () => {
        if (signaturePadRef.current.isEmpty()) {
            alert("Por favor, firme antes de continuar.");
            return;
        }
        const dataUrl = signaturePadRef.current.toDataURL();
        onSave(dataUrl);
    };

    return (
        <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-white">
                <canvas
                    ref={canvasRef}
                    className="w-full h-48 touch-none cursor-crosshair"
                />
            </div>
            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={handleClear}
                    className="flex-1 btn-secondary text-sm py-2"
                >
                    <Eraser className="w-4 h-4" />
                    Limpiar
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 btn-primary text-sm py-2"
                >
                    <Check className="w-4 h-4" />
                    Confirmar Firma
                </button>
            </div>
        </div>
    );
};
