const getCategoryEndPoint = (category: string) => {
  switch (category) {
    case "iphone":
      return "iphone";
    case "ipad":
      return "ipad";
    case "macbook":
      return "macbook";
    case "iwatch":
      return "iwatch";
    default:
      throw new Error("Unknown category");
  }
};

export default getCategoryEndPoint