import { cn } from "@/lib/utils";

/** Seamless looping marquee. Items are duplicated; CSS translates −50%. */
export function Marquee({
  items,
  className,
  itemClassName,
  separator,
}: {
  items: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  separator?: React.ReactNode;
}) {
  const loop = [...items, ...items];
  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <div className="flex w-max shrink-0 animate-marquee items-center">
        {loop.map((item, i) => (
          <span key={i} className={cn("flex items-center", itemClassName)}>
            {item}
            {separator ?? <span className="mx-6 text-green">✦</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
