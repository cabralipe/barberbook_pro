import React, { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { getStyleConsultation } from '../services/geminiService';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConsult = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await getStyleConsultation(input);
    setRecommendation(result);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">AI Style Consultant</h3>
            <p className="text-sm text-gray-400">Powered by Gemini 3</p>
          </div>
        </div>

        {!recommendation ? (
          <>
            <p className="text-gray-300 mb-4">
              Descreva seu tipo de rosto, cabelo atual e o que você busca. Nossa IA irá sugerir o melhor estilo.
            </p>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: Tenho rosto redondo, cabelo liso e quero algo moderno mas fácil de cuidar..."
              className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none mb-4"
            />
            <Button 
              fullWidth 
              onClick={handleConsult} 
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  Pensando...
                </span>
              ) : (
                'Obter Recomendação'
              )}
            </Button>
          </>
        ) : (
          <div className="animate-fade-in">
            <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
              <h4 className="text-indigo-400 font-semibold mb-2 text-sm uppercase tracking-wider">Recomendação</h4>
              <p className="text-gray-200 leading-relaxed">
                {recommendation}
              </p>
            </div>
            <Button variant="secondary" fullWidth onClick={() => { setRecommendation(''); setInput(''); onClose(); }}>
              Fechar e Escolher Serviço
            </Button>
            <button 
              onClick={() => setRecommendation('')} 
              className="w-full text-center mt-3 text-sm text-gray-500 hover:text-gray-300"
            >
              Tentar novamente
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
