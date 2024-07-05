import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import { v4 } from "uuid";
import { toast } from "react-toastify";

const upload = async (file) => {
  if (!file?.type.startsWith("image") || !file) return null;
  const imageRef = ref(storage, v4() + file.name);
  try {
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  } catch (err) {
    toast.error("There was a problem loading the image");
  }
};

export default upload;
