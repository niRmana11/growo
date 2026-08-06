import { AlertTriangle } from 'lucide-react';

export function ConfirmDeleteModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl border border-gray-100 transform transition-all">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-100">
            <AlertTriangle size={32} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">Delete Habit?</h2>

          <p className="text-gray-500 mb-8 leading-relaxed">
            Are you sure you want to delete{' '}
            <span className="font-bold text-gray-800">"{itemName}"</span>? All your streaks and logs
            for this habit will be permanently lost.
          </p>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={onConfirm}
              className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Yes, delete it
            </button>
            <button
              onClick={onClose}
              className="w-full py-3.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition-colors border border-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
