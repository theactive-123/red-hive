import Image from "next/image";

/** Photo that wipes into view and drifts slightly with scroll. */
export default function Photo({
  src,
  alt,
  className = "aspect-[4/3]",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  drift = true,
  hoverZoom = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  drift?: boolean;
  hoverZoom?: boolean;
}) {
  return (
    <div data-clip className={`relative overflow-hidden bg-card ${className}`}>
      <div data-clip-inner className="absolute inset-0">
        <div data-parallax={drift ? "0.06" : undefined} className="absolute -inset-y-[8%] inset-x-0">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={`object-cover ${hoverZoom ? "transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.05]" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}
