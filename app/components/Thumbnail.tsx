'use client'

import Image from "next/image";

type ThumbnailProps = {
  imageUrl?: string | null;
  title: string;
};

export const Thumbnail = ({ imageUrl, title }: ThumbnailProps) => (
  <Image
    src={imageUrl && imageUrl !== "" ? imageUrl : "/no-image.svg"}
    alt={title}
    width={300}
    height={100}
    unoptimized
    onError={(e) => {
      e.currentTarget.src = "/no-image.svg";
    }}
  />
);
