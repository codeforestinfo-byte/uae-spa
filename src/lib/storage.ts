import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { auth } from "./firebase";

const storage = getStorage();

export async function uploadAvatar(file: File): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const storageRef = ref(storage, `profiles/${user.uid}/avatar.jpg`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

export async function deleteAvatar(): Promise<void> {
  const user = auth.currentUser;
  if (!user) return;

  const storageRef = ref(storage, `profiles/${user.uid}/avatar.jpg`);
  try {
    await deleteObject(storageRef);
  } catch {
    // File might not exist - ignore
  }
}

export { storage };
