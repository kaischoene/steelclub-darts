import L from "leaflet";
import type { PinColor } from "../data/events";

const colorMap: Record<PinColor, string> = {
  purple: "#A855F7",
  blue: "#3B82F6",
  gray: "#6B6481",
};

export function makeDartPin(color: PinColor = "purple", isFeatured = false) {
  const fill = colorMap[color];
  const size = isFeatured ? 44 : 36;
  const h = isFeatured ? 54 : 44;
  return L.divIcon({
    className: "custom-dart-pin",
    html: `
      <div style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.45)) drop-shadow(0 0 12px ${fill}66);">
        <svg width="${size}" height="${h}" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 0C8.058 0 0 8.058 0 18c0 13.5 18 26 18 26s18-12.5 18-26C36 8.058 27.942 0 18 0z" fill="${fill}"/>
          <circle cx="18" cy="18" r="12" fill="white"/>
          <circle cx="18" cy="18" r="9" fill="none" stroke="${fill}" stroke-width="1.5"/>
          <circle cx="18" cy="18" r="6" fill="none" stroke="${fill}" stroke-width="1.5"/>
          <circle cx="18" cy="18" r="2.5" fill="${fill}"/>
        </svg>
      </div>
    `,
    iconSize: [size, h],
    iconAnchor: [size / 2, h],
    popupAnchor: [0, -h + 8],
  });
}
