'use client'

import Image from "next/image";

type ThumbnailProps = {
  imageUrl?: string | null;
  title: string;
};

function isValidImageUrl(url: unknown): url is string {
  if (typeof url !== "string") return false;
  if (url.trim() === "" || url === "null" || url === "undefined") return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export const Thumbnail = ({ imageUrl, title }: ThumbnailProps) =>{
  const safeImageUrl = isValidImageUrl(imageUrl) ? imageUrl : "/no-image.svg";

     return (
       <Image
         src={safeImageUrl}
         alt={title}
         width={300}
         height={100}
         unoptimized
         onError={(e) => {
           e.currentTarget.src = "/no-image.svg";
         }}
       />
     );
}
