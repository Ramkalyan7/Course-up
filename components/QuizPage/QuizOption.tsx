"use client";

interface QuizOptionProps {
  option: string;
  optIndex: number;
  isSelected: boolean;
  isSubmitted: boolean;
  isCorrectOption: boolean;
  isCorrect: boolean;
  onSelect: () => void;
}

export default function QuizOption({
  option,
  optIndex,
  isSelected,
  isSubmitted,
  isCorrectOption,
  isCorrect,
  onSelect,
}: QuizOptionProps) {
  let buttonClass = `w-full text-left p-4 rounded-lg border-2 transition-all ${!isSubmitted && "cursor-pointer"} `;

  if (isSubmitted) {
    if (isCorrectOption) {
      buttonClass += "border-emerald-500 bg-emerald-500/20 text-gray-100 shadow-lg shadow-emerald-500/20";
    } else if (isSelected && !isCorrect) {
      buttonClass += "border-red-500 bg-red-500/20 text-gray-100 shadow-lg shadow-red-500/20";
    } else {
      buttonClass += "border-gray-700/50 bg-black/30 text-gray-500 ";
    }
  } else {
    if (isSelected) {
      buttonClass += "border-emerald-500 bg-emerald-500/10 text-gray-100 shadow-lg shadow-emerald-500/20";
    } else {
      buttonClass += "border-gray-700 bg-black/30 text-gray-300 hover:border-emerald-500/50 hover:bg-black/50";
    }
  }

  return (
    <button onClick={onSelect} disabled={isSubmitted} className={buttonClass} >
      <div className="flex items-center gap-3 ">
        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-800 flex items-center justify-center font-bold text-sm">
          {String.fromCharCode(65 + optIndex)}
        </span>
        <span className="flex-1 text-sm sm:text-base">{option}</span>
        {isSubmitted && isCorrectOption && <span className="text-emerald-400 text-xl">✓</span>}
        {isSubmitted && isSelected && !isCorrect && <span className="text-red-400 text-xl">✗</span>}
      </div>
    </button>
  );
}
