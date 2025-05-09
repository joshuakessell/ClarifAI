import { useState } from "react";

interface BreakingNewsAlertProps {
  headline: string;
  content: string;
  time?: string;
  onDismiss?: () => void;
  onReadMore?: () => void;
}

export function BreakingNewsAlert({ 
  headline, 
  content, 
  time, 
  onDismiss, 
  onReadMore 
}: BreakingNewsAlertProps) {
  const [visible, setVisible] = useState(true);
  
  if (!visible) return null;
  
  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };
  
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 mx-4 mt-4 sm:mx-6 lg:mx-8 rounded-md">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <i className="fas fa-exclamation-circle text-yellow-400 text-xl"></i>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Breaking News</h3>
          <div className="mt-1 text-sm text-yellow-700">
            {content}
          </div>
          <div className="mt-2">
            <button 
              type="button" 
              className="text-xs text-yellow-800 font-medium hover:underline"
              onClick={onReadMore}
            >
              Read full story →
            </button>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button 
              className="p-1.5 text-yellow-500 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 rounded-md"
              onClick={handleDismiss}
            >
              <span className="sr-only">Dismiss</span>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreakingNewsAlert;
