export default function uploadTrack(req, res) {
  const { userID } = req.params;
  // todo: save path to track on user Model in database
  res.status(200);
  res.send({ filename: req.file.filename });
}
