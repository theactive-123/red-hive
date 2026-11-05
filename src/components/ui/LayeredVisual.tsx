import Photo from "./Photo";
import Illustration from "@/components/illustrations/Illustration";

/** Project shot with the logo's cut corner, or the animated illustration when there is no project image yet. */
export default function LayeredVisual({ photo, illus, priority = false }: { photo?: { src: string; alt: string }; illus?: string; priority?: boolean; flip?: boolean }) {
  if (photo) return <Photo src={photo.src} alt={photo.alt} priority={priority} drift={false} className="cut-tl aspect-[6/5] [--cut:44px]" />;
  return (
    <div data-clip className="cut-tl relative flex aspect-[6/5] items-center bg-card p-6 [--cut:44px] md:p-10">
      <div data-clip-inner className="w-full">{illus && <Illustration name={illus} className="h-auto w-full" />}</div>
    </div>
  );
}
