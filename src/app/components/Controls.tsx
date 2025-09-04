"use client";

interface ControlsProps {
  minutes: number;
  seconds: number;
  score: number;
  onReset: () => void;
  onStart: () => void;
}

export default function Controls({ minutes, seconds, score, onReset, onStart }: ControlsProps) {
  return (
    <div className="flex justify-center gap-5 text-3xl mt-0.5">
      <p>{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</p>
      <p>Pontuação: {score}</p>

      <button onClick={onReset} className="px-4 py-2 bg-green-500 text-white rounded">Resete</button>
      <button onClick={onStart} className="px-4 py-2 bg-blue-500 text-white rounded">Start</button>
    </div>
  );
}
