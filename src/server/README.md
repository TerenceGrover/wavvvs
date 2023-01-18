# Server

- Node
- Express
- Mongoose
- Multer

## More information

The tracks get uploaded from the client to the ''./public/tracks'' directory using Multer.

On ``router.js``

```js
const  upload  =  multer({ dest: './public/tracks' });
router.post('/:username/tracks', checkFileSize, upload.single('track'), Track.uploadTrack);
```

``checkFileSize`` sends and ``407`` status code back to the client if the file is too big.
``upload.single('track')`` is a function by Multer that uploads the file to the selected directory, gives it a random name and adds ``file`` property to the ``res`` object. That name is used in ``Track.uploadTrack`` controller to store the file name.

```js
 const { originalname, filename, size } = req.file;
```

In ``index.js`` I serve the ``./public`` folder as static files.

```js
app.use(express.static('./public'));
```

So you can stream a song after uploading it if you go to ``http://localhost:3001/tracks/randomNameGeneratedByMulter``

Tracks get deleted form the DB and filesystem with the functionality in the ``cronJob.js`` file.
Tracks get deleted if uploaded more than 24 hours ago.
