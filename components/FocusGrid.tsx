import { copy } from "@/content/copy";

export function FocusGrid() {
  return (
    <section
      aria-label="Focus areas"
      className="border-y border-crimson flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-crimson"
    >
      {copy.focusGrid.items.map((label) => (
        <div
          key={label}
          className="flex-1 h-[109px] flex items-center justify-center font-serif text-[22px] text-ink"
        >
          {label}
        </div>
      ))}
    </section>
  );
}
