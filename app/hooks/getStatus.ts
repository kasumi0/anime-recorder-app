export const getStatus = (status: string) => {
  switch (status) {
    case "WANT_TO_WATCH":
      return "観たい！";
    case "WATCHING":
      return "今観てる";
    case "COMPLETED":
      return "観た！";
    case "ON_HOLD":
      return "保留中";
    case "DROPPED":
      return "途中でやめた";
    default:
      return status;
  }
};
