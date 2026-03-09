import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Chip({ children, onRemove, active, onClick, className }) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
        active
          ? 'bg-primary-100 text-primary-700 border border-primary-300'
          : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="ml-0.5 hover:text-red-500 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </span>
  );
}
