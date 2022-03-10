import { getDownloadURL, UploadTaskSnapshot } from 'firebase/storage';
import { firebaseStorage, uploadBytesResumable } from '../firebase/clientApp';

type uploadImageProps = {
  path: string;
  images: File[];
};

export default function uploadImage({ path, images }: uploadImageProps) {
  const imageUrl: string[] = [];
  images.map((file) => {
    const storageRef = firebaseStorage.ref(`${path}${file.name}`);
    uploadBytesResumable(storageRef, file, {
      contentType: file.type,
    }).on(
      'state_changed',
      (snapshot: UploadTaskSnapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(storageRef).then((url) => {
          imageUrl.push(url);
        });
      },
    );
  });
  return imageUrl;
}
