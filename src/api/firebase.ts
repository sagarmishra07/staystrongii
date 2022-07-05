/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { fireDatabase } from '../firebase/firebase';
import { ref, set, get, push, remove, query } from 'firebase/database';
import {
  getStorage,
  ref as storeRef,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';

export const firebaseStore = async (url: string, data: any) =>
  await set(ref(fireDatabase, url), data);

export const firebasePush = async (url: string, data: any) => {
  return await push(ref(fireDatabase, url), data).key;
};

export const firebaseGet = async (url: string) =>
  await get(ref(fireDatabase, url)).then((snapshot) => snapshot.val());

export const firebaseGetOne = async (url: string, id: string) =>
  await get(ref(fireDatabase, url + '/' + id)).then((snapshot) =>
    snapshot.val()
  );

export const firebaseRemove = async (url: string, id: string) =>
  await remove(ref(fireDatabase, url + '/' + id));

//update api

export const firebaseUpdate = async (url: string, id: string, data: any) =>
  await set(ref(fireDatabase, url + '/' + id), data);

export const firebaseGetDataByQuery = async (url: string) =>
  await get(query(ref(fireDatabase, url))).then((snapshot) => snapshot.val());

export const firebaseUploadImages = async (
  url: string,
  id: string,
  images: any
) => {
  const imageInfo = storeRef(getStorage(), `image/${url}/${images[0].name}`);

  const metadata = {
    contentType: `${images[0].imageType}`,
    //In this line you are adding the access token
  };

  await uploadBytesResumable(imageInfo, images[0], metadata);
  return await firebaseUpdate(
    `${url}/${id}`,
    'images',
    await getDownloadURL(imageInfo)
  );
};
