export default function uploadTrack(req, res) {
  const { username } = req.params;
  const { originalname, filename } = req.file;
  // todo: save path to track on user Model in database
  console.log(req.file);
  res.status(200);
  res.send({ originalname, filename });
}
