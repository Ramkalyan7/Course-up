type StatsCardProps = {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
  iconColor: string;
};

export function StatsCard({ icon, label, value, bgColor, iconColor }: StatsCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-800">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-gray-500 text-xs sm:text-sm">{label}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-100">{value}</p>
        </div>
      </div>
    </div>
  );
}
