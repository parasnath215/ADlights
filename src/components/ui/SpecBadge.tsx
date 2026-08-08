'use client';

import React from 'react';
import * as Icons from 'lucide-react';

interface SpecBadgeProps {
  iconName: string;
  label: string;
  value: string;
}

export const SpecBadge: React.FC<SpecBadgeProps> = ({ iconName, label, value }) => {
  // Dynamically pick Lucide icon
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[iconName] || Icons.Sparkles;

  return (
    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-bg-muted border border-border/80 text-xs">
      <div className="p-1.5 rounded-md bg-white text-text-primary border border-border shadow-xs shrink-0">
        <IconComponent size={14} className="text-zinc-800" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium leading-none">{label}</p>
        <p className="font-semibold text-text-primary truncate mt-0.5">{value}</p>
      </div>
    </div>
  );
};
