// Developer habit templates - pre-loaded on registration
// No empty state on day one for new users

export const DEVELOPER_HABIT_TEMPLATES = [
  {
    title: 'LeetCode / DSA practice',
    description: 'Solve algorithm problems daily',
    category: 'coding',
    icon: '🧠',
    color: '#F59E0B',
    frequency: 'daily',
  },
  {
    title: 'Build my side project',
    description: 'Work on personal projects',
    category: 'coding',
    icon: '🚀',
    color: '#6366F1',
    frequency: 'daily',
  },
  {
    title: 'Read tech articles / docs',
    description: 'Keep learning from the community',
    category: 'learning',
    icon: '📖',
    color: '#10B981',
    frequency: 'daily',
  },
  {
    title: 'GitHub commit streak',
    description: 'Keep the green square rolling',
    category: 'coding',
    icon: '🐙',
    color: '#1D4ED8',
    frequency: 'daily',
  },
  {
    title: 'No-screen focus hour',
    description: 'Take time away from screens',
    category: 'health',
    icon: '🧘',
    color: '#EC4899',
    frequency: 'daily',
  },
];

export const HABIT_CATEGORIES = [
  { name: 'coding', label: 'Coding', color: '#3B82F6', icon: '💻' },
  { name: 'learning', label: 'Learning', color: '#10B981', icon: '📚' },
  { name: 'health', label: 'Health', color: '#EC4899', icon: '🏃' },
  { name: 'reading', label: 'Reading', color: '#F59E0B', icon: '📖' },
];
