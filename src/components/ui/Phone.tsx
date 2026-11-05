import Image from "next/image";

/** CSS phone frame with a real app screen inside. Width drives everything else. */
export default function Phone({ src, alt, className = "w-[260px]", priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <div className="relative aspect-[9/19.5] rounded-[14%/6.5%] bg-[#0b0b0f] p-[3.2%] shadow-[0_40px_70px_-30px_rgba(0,2,10,0.55),inset_0_0_0_1.5px_rgba(255,255,255,0.08)]">
        <div className="relative h-full w-full overflow-hidden rounded-[11.5%/5.3%] bg-white">
          <Image src={src} alt={alt} fill sizes="300px" priority={priority} className="object-cover object-top" />
        </div>
        {/* side buttons */}
        <span className="absolute -left-[1.5%] top-[18%] h-[6%] w-[1.5%] rounded-l bg-[#1a1a20]" />
        <span className="absolute -left-[1.5%] top-[27%] h-[9%] w-[1.5%] rounded-l bg-[#1a1a20]" />
        <span className="absolute -right-[1.5%] top-[24%] h-[12%] w-[1.5%] rounded-r bg-[#1a1a20]" />
      </div>
    </div>
  );
}
