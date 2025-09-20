'use client';

import * as React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

type TrustMeterProps = {
  score: number;
};

export default function TrustMeter({ score }: TrustMeterProps) {
  const getMeterInfo = (value: number) => {
    if (value < 40) {
      return {
        label: 'Low Trust',
        colorClass: 'bg-destructive',
        textClass: 'text-destructive',
      };
    }
    if (value < 70) {
      return {
        label: 'Moderate Trust',
        colorClass: 'bg-yellow-500', // using a tailwind default as we don't have a theme color for warning
        textClass: 'text-yellow-500',
      };
    }
    return {
      label: 'High Trust',
      colorClass: 'bg-green-500', // using a tailwind default as chart-2 may not be green
      textClass: 'text-green-500',
    };
  };

  const { label, colorClass, textClass } = getMeterInfo(score);

  return (
    <div className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
            <span className={cn("text-5xl font-bold tracking-tighter", textClass)}>
            {score}
            </span>
             <span className={cn("font-semibold", textClass)}>{label}</span>
        </div>
      <Progress value={score} indicatorClassName={cn("transition-all duration-500", colorClass)} />
    </div>
  );
}
