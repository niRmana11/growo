import bookIcon from '../assets/icons/book.png';
import codeIcon from '../assets/icons/code.png';
import joggingIcon from '../assets/icons/jogging.png';
import heartIcon from '../assets/icons/heart.png';
import targetIcon from '../assets/icons/target.png';
import penIcon from '../assets/icons/pen.png';
import dumbbellIcon from '../assets/icons/dumbbell.png';
import rocketIcon from '../assets/icons/rocket.png';
import starIcon from '../assets/icons/star.png';
import paletteIcon from '../assets/icons/palette.png';
import smileIcon from '../assets/icons/smile.png';
import clockIcon from '../assets/icons/clock.png';

export const HABIT_ICONS = [
  { name: 'book-open', src: bookIcon, label: 'Learning', type: 'image' },
  { name: 'code', src: codeIcon, label: 'Coding', type: 'image' },
  { name: 'zap', src: joggingIcon, label: 'Fitness', type: 'image' },
  { name: 'heart', src: heartIcon, label: 'Health', type: 'image' },
  { name: 'target', src: targetIcon, label: 'Productivity', type: 'image' },
  { name: 'pen-tool', src: penIcon, label: 'Writing', type: 'image' },
  { name: 'dumbbell', src: dumbbellIcon, label: 'Strength', type: 'image' },
  { name: 'rocket', src: rocketIcon, label: 'Growth', type: 'image' },
  { name: 'star', src: starIcon, label: 'Achievement', type: 'image' },
  { name: 'palette', src: paletteIcon, label: 'Creativity', type: 'image' },
  { name: 'smile', src: smileIcon, label: 'Fun', type: 'image' },
  { name: 'clock', src: clockIcon, label: 'Time', type: 'image' },
];

// Create lookup map for quick icon access by name
export const getHabitIconComponent = (iconName) => {
  const icon = HABIT_ICONS.find((i) => i.name === iconName);
};

// Get icon by name - returns object with name, component, and label
export const getHabitIcon = (iconName) => {
  return HABIT_ICONS.find((i) => i.name === iconName) || HABIT_ICONS[8]; // Default to star
};
