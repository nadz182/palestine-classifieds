import { cn } from '../../utils/cn';

export function Toggle({ enabled, onChange, label }) {
  return (
    <label className="flex items-center cursor-pointer gap-2">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={cn(
          'w-10 h-6 rounded-full transition-colors',
          enabled ? 'bg-primary-600' : 'bg-gray-300'
        )} />
        <div className={cn(
          'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
          enabled && 'translate-x-4'
        )} />
      </div>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}
