const loadImage = src => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("image not loaded"));
  });
};

export default {
  loadImage
};
