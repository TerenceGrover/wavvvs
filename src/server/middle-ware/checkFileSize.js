const MAX_FILE_SIZE_IN_BYTES = 104857600; // 100MB;

const checkFileSize = (req, res, next) => {
  try {
    const fileSize = parseInt(req.headers['content-length']);
    // console.log({ fileSize });
    if (fileSize > MAX_FILE_SIZE_IN_BYTES) {
      throw new Error('File size exceeded');
    }
    next();
  } catch (error) {
    // why 407 ?
    res.status(407).send({ error });
  }
};

export default checkFileSize;
