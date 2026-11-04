import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#00020a",
    theme_color: "#e1013b",
    icons: [{ src: "/icon.png", sizes: "256x256", type: "image/png" }],
  };
}
