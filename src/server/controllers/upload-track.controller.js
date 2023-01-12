export default async function uploadTrack(req, res) {
  console.log('im here');
  console.log(req.file, req.body);
  res.sendStatus(200);
}
