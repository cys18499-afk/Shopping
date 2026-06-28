import { clsx } from "clsx";

export default function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] mb-10 w-max">
      <div
        className={clsx(
          "px-6 py-3 bg-black/90 text-white text-[13px] font-medium rounded-full shadow-xl",
          "animate-in fade-in slide-in-from-bottom-4 duration-300",
        )}
      >
        {message}
      </div>
    </div>
  );
}
