import Photo from "./Photo";
import Illustration from "@/components/illustrations/Illustration";

/** Photo with an animated UI card floating over one corner. */
export default function LayeredVisual({ photo, illus, priority = false, flip = false }: { photo: { src: string; alt: string }; illus: string; priority?: boolean; flip?: boolean }) {
  return (
    <div className={`relative ${flip ? "md:pl-[12%]" : "md:pr-[12%]"} pb-[18%]`}>
      <Photo src={photo.src} alt={photo.alt} priority={priority} className="cut-tl aspect-[6/5] [--cut:44px]" />
      <div
        data-parallax="-0.12"
        className={`absolute bottom-0 w-[64%] bg-white p-3 shadow-[0_30px_60px_-25px_rgba(0,2,10,0.45)] md:p-4 ${flip ? "left-0" : "right-0"}`}
      >
        <Illustration name={illus} className="h-auto w-full" />
      </div>
    </div>
  );
}
