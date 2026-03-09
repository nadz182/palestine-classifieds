import { cn } from '../../utils/cn';

const variants = {
  sale: 'bg-primary-600 text-white',
  rent: 'bg-accent-600 text-white',
  land: 'bg-amber-600 text-white',
  property: 'bg-indigo-600 text-white',
  default: 'bg-gray-200 text-gray-700',
  outline: 'border border-gray-300 text-gray-600',
};

export function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
