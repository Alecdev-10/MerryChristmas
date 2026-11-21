import { ILLUSTRATIONS, type IllusKind } from "@/lib/illustrations";

/** Dessin au trait, maison, d'un type de produit. La couleur suit `color`. */
export default function Illustration({
  kind,
  color = "currentColor",
  stroke = 2.2,
  className,
}: {
  kind: IllusKind;
  color?: string;
  stroke?: number;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      {ILLUSTRATIONS[kind].map((el, i) => (
        <path
          key={i}
          d={el.d}
          fill={el.fill ? color : "none"}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
