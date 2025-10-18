import { AlertCircle } from 'lucide-react';

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
      <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
      <div className="flex-1">
        <h3 className="text-red-800 font-semibold mb-1">Error Loading Companies</h3>
        <p className="text-red-700 text-sm">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
