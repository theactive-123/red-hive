import Photo from "./Photo";

/** Hero product shot with the logo's cut corner. */
export default function LayeredVisual({ photo, priority = false }: { photo: { src: string; alt: string }; illus?: string; priority?: boolean; flip?: boolean }) {
  return <Photo src={photo.src} alt={photo.alt} priority={priority} drift={false} className="cut-tl aspect-[6/5] [--cut:44px]" />;
}
