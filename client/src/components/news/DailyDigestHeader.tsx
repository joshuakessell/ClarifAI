import { useState } from "react";
import { useRouter } from "wouter/use-location";

interface DailyDigestHeaderProps {
  date: Date;
  onViewModeChange: (mode: 'feed' | 'conflict' | 'timeline') => void;
  currentMode: 'feed' | 'conflict' | 'timeline';
}

export function DailyDigestHeader({ 
  date, 
  onViewModeChange,
  currentMode = 'feed'
}: DailyDigestHeaderProps) {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-neutral-dark mb-2">Today's Digest</h1>
      <p className="text-gray-500">Factually verified, bias-neutral updates for {formatDate(date)}</p>
      <div className="flex items-center mt-4">
        <span className="text-sm text-gray-500 mr-2">View mode:</span>
        <button 
          className={`${currentMode === 'feed' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'} rounded-md px-3 py-1 text-sm mr-2`}
          onClick={() => onViewModeChange('feed')}
        >
          <i className="fas fa-newspaper mr-1"></i>
          Feed
        </button>
        <button 
          className={`${currentMode === 'conflict' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'} rounded-md px-3 py-1 text-sm mr-2`}
          onClick={() => onViewModeChange('conflict')}
        >
          <i className="fas fa-balance-scale mr-1"></i>
          Conflict View
        </button>
        <button 
          className={`${currentMode === 'timeline' ? 'bg-primary text-white' : 'bg-white text-gray-700 border border-gray-300'} rounded-md px-3 py-1 text-sm`}
          onClick={() => onViewModeChange('timeline')}
        >
          <i className="fas fa-stream mr-1"></i>
          Timeline
        </button>
      </div>
    </div>
  );
}

export default DailyDigestHeader;
