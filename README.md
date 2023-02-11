# <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/TerenceGrover/wavvvs" /> <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/TerenceGrover/wavvvs" />

# wavvvs

Minimal audio sharing/streaming for producers. Tracks will last 24 hours online.

# Try it

``git clone https://github.com/MateoPresaCastro/wavvvs.git``

``cd wavvvs/src``

Do ``npm install && npm start`` inside the ``client`` directory and  ``npm install && nodemon index.js`` or ``npm install && node index.js`` in the ``server`` directory.

Open the browser and go to ``http://localhost:3000/``.

Currently there only two routes: ``http://localhost:3000/mateopresa`` and
``http://localhost:3000/randomproducer``.

You can upload, delete and control track playback on the ``mateopresa`` route. In the ``randomproducer`` route you can only control playback.

More information inside both directories.
