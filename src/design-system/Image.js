import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export function Image({ image }) {
  return (
    <div>
      <LazyLoadImage src={image} alt="Image Alt" style={{ maxWidth: "100%" }} />
    </div>
  );
}
