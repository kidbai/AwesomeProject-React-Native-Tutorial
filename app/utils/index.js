export const getPostType = (type) => {
  return type.toLocaleLowerCase()
}

export const formatTime = (seconds) => {
  return [
        parseInt(seconds / 60 % 60),  // min
        parseInt(seconds % 60)  // second
    ]
        .join(":")
        .replace(/\b(\d)\b/g, "0$1");
}
