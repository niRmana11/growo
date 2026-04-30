import { useState } from 'react';
import { HABIT_ICONS } from '../../utils/habitIcons.js';

const CATEGORIES = [
  { value: 'coding', label: 'Coding' },
  { value: 'learning', label: 'Learning' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'health', label: 'Health' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'fun', label: 'Fun' },
  { value: 'other', label: 'Other' },
];

export function HabitForm({ initialData, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      description: '',
      category: 'other',
      icon: 'star',
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Habit name is required';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Habit name must be 100 characters or less';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be 500 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      icon: formData.icon, // Now stores icon name (e.g., 'star', 'book-open')
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Icon selector - 6 columns with larger buttons */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">Choose Icon</label>
        <div className="grid grid-cols-6 gap-2">
          {HABIT_ICONS.map((iconObj) => {
            const IconComponent = iconObj.component;
            const isSelected = formData.icon === iconObj.name;
            return (
              <button
                key={iconObj.name}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, icon: iconObj.name }))}
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? 'bg-green-400 ring-green-200 scale-110 shadow-lg'
                    : 'bg-gray-100 hover:bg-green-100 hover:scale-105'
                }`}
                title={iconObj.label}
              >
                <IconComponent size={24} className={isSelected ? 'text-white' : 'text-gray-700'} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Name and Category - Two columns */}
      <div className="grid grid-cols-3 gap-4">
        {/* Habit Name - Left */}
        <div className="col-span-2">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
            Habit Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Code 1 hour"
            maxLength={100}
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
              errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
            } disabled:bg-gray-100`}
            disabled={isLoading}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>}
          <p className="text-xs text-gray-500 mt-1">{formData.name.length}/100</p>
        </div>

        {/* Category - Right */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white disabled:bg-gray-100"
            disabled={isLoading}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description - Full width */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
          Description <span className="text-gray-500 font-normal">(optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add details about this habit..."
          maxLength={500}
          rows={3}
          className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none ${
            errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
          } disabled:bg-gray-100`}
          disabled={isLoading}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.description}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500</p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span> Saving...
            </span>
          ) : initialData ? (
            'Update Habit'
          ) : (
            'Create Habit'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
