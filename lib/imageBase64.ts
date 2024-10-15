export default function imageToBase64(image: File) {
  return new Promise<ImageObject>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const imageObject = {
        name: image.name,
        size: image.size,
        base64: reader.result,
        mineType: image.name.split(".").at(-1)?.toLocaleLowerCase(),
        lastModified: image.lastModified,
      };
      resolve(imageObject);
    };

    reader.onerror = (error) => {
      const errorObject = {
        message: "il y a une erreur de telechargement",
        error,
      };
      reject(errorObject);
    };

    reader.readAsDataURL(image);
  });
}

export type ImageObject = {
  name: string;
  size: number;
  base64: string | ArrayBuffer | null;
  mineType: string | undefined;
  lastModified: number;
};
