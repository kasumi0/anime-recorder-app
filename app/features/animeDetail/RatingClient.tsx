"use client";

import StarRatings from "react-star-ratings";

type Props = {
  value: number;
};

export const RatingClient = ({ value }: Props) => (
  <StarRatings
    rating={Number(value)}
    starRatedColor="gold"
    numberOfStars={5}
    starDimension="25px"
    starSpacing="2px"
  />
);
