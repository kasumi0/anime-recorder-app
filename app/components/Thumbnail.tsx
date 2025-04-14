import Image from "next/image";

type ThumbnailProps = {
  imageUrl?: string | null;
  title: string;
};

export const Thumbnail = ({ imageUrl, title }: ThumbnailProps) =>
  imageUrl ? (
    <Image
      src={imageUrl || "/no-image.svg"}
      alt={title}
      width={200}
      height={120}
      unoptimized
      onError={(e) => (e.currentTarget.src = "/no-image.svg")}
    />
  ) : (
    <Image src="/no-image.svg" alt={title} width={200} height={120} />
  );
