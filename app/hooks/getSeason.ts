export const getSeason = (season: string | undefined) => {
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
