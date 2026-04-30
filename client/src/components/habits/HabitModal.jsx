import { X } from 'lucide-react';
import { HabitForm } from './HabitForm.jsx';

export function HabitModal({ isOpen, mode = 'create', habitData, onClose, onSubmit, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full px-5 py-3">
        {/* Modal header */}
        <div className="sticky top-0 bg-white p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {mode === 'create' ? 'Create New Habit' : 'Edit Habit'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            disabled={isLoading}
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-4">
          <HabitForm
            initialData={mode === 'edit' ? habitData : undefined}
            onSubmit={onSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
