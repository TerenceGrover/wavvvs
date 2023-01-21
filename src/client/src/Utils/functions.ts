export async function uploadProfilePic (file : File) : Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'frameit');
  return fetch('https://api.cloudinary.com/v1_1/dkqmqt1gr/image/upload', {
    method: 'POST',
    body: formData,
  }).then((res) => res.text());
}