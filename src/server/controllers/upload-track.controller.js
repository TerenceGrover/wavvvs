export default async function uploadTrack(req, res) {
  console.log('posted?');
  const { userID } = req.params;
  res.status(200);
  res.send({ success: 'it works' });
}
