import { animeType } from "@/app/types/types";
import Image from "next/image";

export const Card = ({
  annictId,
  image,
  title,
  seasonYear,
  seasonName,
}: animeType) => {
  const getSeason = (season: string | undefined) => {
    switch (season) {
      case "SPRING":
        return "春";
      case "SUMMER":
        return "夏";
      case "AUTUMN":
        return "秋";
      case "WINTER":
        return "冬";
      default:
        return season;
    }
  };

  return (
    <li key={annictId}>
      {image?.facebookOgImageUrl ? (
        <Image
          src={image?.facebookOgImageUrl || "/no-image.svg"}
          alt={title}
          width={200}
          height={120}
          unoptimized
          onError={(e) => (e.currentTarget.src = "/no-image.svg")}
        />
      ) : (
        <Image src="/no-image.svg" alt={title} width={200} height={120} />
      )}
      <h3>{title}</h3>
      <div>
        {seasonYear && <span>{`${seasonYear}年`}</span>}
        {seasonName && <span>{getSeason(seasonName)}</span>}
      </div>
    </li>
  );
};
