
import React from 'react';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import { VerificationLevel } from '../types';

interface VerificationBadgeProps {
  level?: VerificationLevel;
  showLabel?: boolean;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ level = 'self', showLabel = false, className = '' }) => {
  
  const getConfig = (lvl: VerificationLevel) => {
    switch (lvl) {
      case 'faculty':
        return {
          icon: ShieldCheck,
          color: 'text-emerald-400',
          bg: 'bg-emerald-400/10',
          border: 'border-emerald-400/20',
          label: 'Faculty Verified',
          tooltip: 'Verified by faculty members or senior alumni.'
        };
      case 'peer':
        return {
          icon: Shield,
          color: 'text-blue-400',
          bg: 'bg-blue-400/10',
          border: 'border-blue-400/20',
          label: 'Peer Verified',
          tooltip: 'Verified by classmates, teammates, or colleagues.'
        };
      case 'self':
      default:
        return {
          icon: ShieldAlert,
          color: 'text-yellow-400',
          bg: 'bg-yellow-400/10',
          border: 'border-yellow-400/20',
          label: 'Self-Declared',
          tooltip: 'Information provided by the user. Not yet verified.'
        };
    }
  };

  // Fixed error: Argument of type 'string' is not assignable to parameter of type 'VerificationLevel'.
  // Explicitly cast to VerificationLevel to ensure the destructured prop matches the literal union type.
  const config = getConfig(level as VerificationLevel);
  const Icon = config.icon;

  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${config.bg} ${config.border} ${className}`}
      title={config.tooltip}
    >
      <Icon className={`w-3.5 h-3.5 ${config.color}`} />
      {showLabel && (
        <span className={`text-[10px] font-bold uppercase tracking-wide ${config.color}`}>
          {config.label}
        </span>
      )}
    </div>
  );
};
