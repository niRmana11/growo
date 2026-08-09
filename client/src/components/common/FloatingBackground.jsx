import {
  CheckCircle2,
  Target,
  Zap,
  Heart,
  Flame,
  Sparkles,
  Trophy,
  Coffee,
  BookOpen,
  Crown,
  TrendingUp,
  Rocket,
  Award,
  Leaf,
  Medal,
  Sunrise,
  Activity,
  ThumbsUp,
  Timer,
  Check,
  CalendarDays,
  ListChecks,
  Goal,
  Brain,
  Focus,
  RefreshCw,
  AlarmClock,
  Hourglass,
  Dumbbell,
  Apple,
  BedDouble,
  GraduationCap,
  Lightbulb,
  SmilePlus,
  BadgeCheck,
} from 'lucide-react';

export const FloatingBackground = () => {
  const icons = [
    // --- Group 1: Far Left Side (0% - 20%) ---
    { Icon: CheckCircle2, size: 28, left: '3%', duration: '22s', delay: '-0s' },
    { Icon: Target, size: 36, left: '8%', duration: '25s', delay: '-3.5s' },
    { Icon: Zap, size: 24, left: '13%', duration: '20s', delay: '-7s' },
    { Icon: CalendarDays, size: 32, left: '18%', duration: '24s', delay: '-10.5s' },
    { Icon: Flame, size: 40, left: '5%', duration: '26s', delay: '-14s' },
    { Icon: Dumbbell, size: 28, left: '10%', duration: '21s', delay: '-17.5s' },
    { Icon: BadgeCheck, size: 30, left: '15%', duration: '23s', delay: '-21s' },

    // --- Group 2: Mid Left Side (20% - 40%) ---
    { Icon: Sparkles, size: 28, left: '23%', duration: '19s', delay: '-21s' },
    { Icon: Trophy, size: 34, left: '28%', duration: '24s', delay: '-17.5s' },
    { Icon: Coffee, size: 26, left: '33%', duration: '21s', delay: '-14s' },
    { Icon: BookOpen, size: 30, left: '38%', duration: '23s', delay: '-10.5s' },
    { Icon: Crown, size: 32, left: '25%', duration: '27s', delay: '-7s' },
    { Icon: Goal, size: 36, left: '30%', duration: '25s', delay: '-3.5s' },
    { Icon: Apple, size: 26, left: '35%', duration: '20s', delay: '-0s' },

    // --- Group 3: Center (40% - 60%) ---
    { Icon: TrendingUp, size: 28, left: '43%', duration: '20s', delay: '-3.5s' },
    { Icon: Rocket, size: 30, left: '48%', duration: '22s', delay: '-7s' },
    { Icon: Award, size: 34, left: '53%', duration: '24s', delay: '-10.5s' },
    { Icon: Leaf, size: 26, left: '58%', duration: '19s', delay: '-14s' },
    { Icon: Medal, size: 28, left: '45%', duration: '21s', delay: '-17.5s' },
    { Icon: Brain, size: 32, left: '50%', duration: '26s', delay: '-21s' },
    { Icon: Focus, size: 28, left: '55%', duration: '23s', delay: '-0s' },

    // --- Group 4: Mid Right Side (60% - 80%) ---
    { Icon: Sunrise, size: 32, left: '63%', duration: '25s', delay: '-14s' },
    { Icon: Activity, size: 24, left: '68%', duration: '18s', delay: '-17.5s' },
    { Icon: ThumbsUp, size: 26, left: '73%', duration: '23s', delay: '-21s' },
    { Icon: Timer, size: 28, left: '78%', duration: '26s', delay: '-0s' },
    { Icon: ListChecks, size: 30, left: '65%', duration: '22s', delay: '-3.5s' },
    { Icon: RefreshCw, size: 24, left: '70%', duration: '19s', delay: '-7s' },
    { Icon: BedDouble, size: 32, left: '75%', duration: '24s', delay: '-10.5s' },

    // --- Group 5: Far Right Side (80% - 100%) ---
    { Icon: Heart, size: 32, left: '83%', duration: '24s', delay: '-21s' },
    { Icon: GraduationCap, size: 34, left: '88%', duration: '25s', delay: '-0s' },
    { Icon: Lightbulb, size: 28, left: '93%', duration: '21s', delay: '-3.5s' },
    { Icon: SmilePlus, size: 30, left: '98%', duration: '22s', delay: '-7s' },
    { Icon: AlarmClock, size: 26, left: '85%', duration: '19s', delay: '-10.5s' },
    { Icon: Hourglass, size: 24, left: '90%', duration: '20s', delay: '-14s' },
    { Icon: Check, size: 22, left: '95%', duration: '23s', delay: '-17.5s' },
  ];

  return (
    // Your exact gradient! It looks fantastic.
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-br from-green-100 via-emerald-50/80 to-green-200">
      <div className="absolute inset-0">
        {icons.map((item, index) => (
          <div
            key={index}
            // Your exact opacity!
            className="absolute -bottom-16 text-emerald-600/25 floating-icon"
            style={{
              left: item.left,
              animationDuration: item.duration,
              animationDelay: item.delay,
            }}
          >
            <item.Icon size={item.size} strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
};
