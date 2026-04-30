import {
  BookOpen,
  Code2,
  Zap,
  Heart,
  Target,
  PenTool,
  Dumbbell,
  Rocket,
  Star,
  Palette,
  Brain,
  Clock,
  Smile,
} from 'lucide-react';

export const HABIT_ICONS = [
  { name: 'book-open', component: BookOpen, label: 'Learning' },
  { name: 'code2', component: Code2, label: 'Coding' },
  { name: 'zap', component: Zap, label: 'Fitness' },
  { name: 'heart', component: Heart, label: 'Health' },
  { name: 'target', component: Target, label: 'Productivity' },
  { name: 'pen-tool', component: PenTool, label: 'Writing' },
  { name: 'dumbbell', component: Dumbbell, label: 'Strength' },
  { name: 'rocket', component: Rocket, label: 'Growth' },
  { name: 'star', component: Star, label: 'Achievement' },
  { name: 'palette', component: Palette, label: 'Creativity' },
  { name: 'smile', component: Smile, label: 'Fun' },
  { name: 'clock', component: Clock, label: 'Time' },
];

// Create lookup map for quick icon access by name
export const getHabitIconComponent = (iconName) => {
  const icon = HABIT_ICONS.find((i) => i.name === iconName);
  return icon ? icon.component : Star; // Default to Star if not found
};

// Get icon by name - returns object with name, component, and label
export const getHabitIcon = (iconName) => {
  return HABIT_ICONS.find((i) => i.name === iconName) || HABIT_ICONS[8]; // Default to star
};
