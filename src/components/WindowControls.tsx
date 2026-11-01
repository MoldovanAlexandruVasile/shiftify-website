// The red, yellow and green dots of a Mac window's title bar.
const DOTS = ["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"];

export const WindowControls = () => (
  <div className="flex gap-[7px] border-b border-line px-3 py-2.5" aria-hidden="true">
    {DOTS.map((color) => (
      <span key={color} className={`size-[11px] rounded-full ${color}`} />
    ))}
  </div>
);
