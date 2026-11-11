import React, { useState } from 'react';
import { ShoppingCart, Zap, Check, X } from 'lucide-react';

const ColorSelectionModal = ({ isOpen, onClose, product, actionType = 'add', onConfirm }) => {
  const [selectedColor, setSelectedColor] = useState('Blue');

  if (!isOpen || !product) return null;

  const colors = [
    {
      id: 'Blue',
      label: 'Blue Ink',
      hex: '#2563EB',
      bgClass: 'bg-blue-600',
      borderClass: 'border-blue-500',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      desc: 'Standard high-visibility contrast for clear/white films'
    },
    {
      id: 'Pink',
      label: 'Pink Ink',
      hex: '#EC4899',
      bgClass: 'bg-pink-500',
      borderClass: 'border-pink-500',
      badgeClass: 'bg-pink-50 text-pink-700 border-pink-200',
      desc: 'Fast visual check for dark, metallic or printed substrates'
    }
  ];

  const handleConfirm = () => {
    onConfirm(selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#DCE5EF] relative transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#0D6EFD] bg-blue-50 px-2.5 py-0.5 rounded">
            Select Color Specification
          </span>
          <h3 className="text-lg font-black text-[#0B3B6F] mt-2 leading-snug">
            Choose Ink Color
          </h3>
          <p className="text-xs text-gray-500 mt-1 truncate">
            {product.name || product.title}
          </p>
        </div>

        {/* Color Options */}
        <div className="space-y-3 mb-6">
          {colors.map((c) => {
            const isSelected = selectedColor === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedColor(c.id)}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  isSelected 
                    ? `${c.borderClass} bg-blue-50/20 shadow-xs` 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full ${c.bgClass} flex items-center justify-center shadow-xs shrink-0`}>
                    {isSelected && <Check size={14} className="text-white stroke-[3]" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{c.label}</h4>
                    <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{c.desc}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${c.badgeClass}`}>
                  {c.id}
                </span>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={handleConfirm}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black text-white shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${
              actionType === 'buy'
                ? 'bg-[#0B3B6F] hover:bg-[#07264a]'
                : 'bg-[#0D6EFD] hover:bg-blue-600'
            }`}
          >
            {actionType === 'buy' ? (
              <>
                <Zap size={14} />
                <span>Confirm &amp; Proceed</span>
              </>
            ) : (
              <>
                <ShoppingCart size={14} />
                <span>Add to Cart ({selectedColor})</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default React.memo(ColorSelectionModal);
