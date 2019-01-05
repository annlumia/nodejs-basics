const assert = require('assert');
const fs = require('fs');
const mongodb = require('mongodb');
const path = require('path');

const uri = 'mongodb://localhost:27017';
const dbName = 'test';

const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });

const filePath = path.join(__dirname, 'one-more-night.mp3');

client.connect(function(error) {
  assert.ifError(error);

  const db = client.db(dbName);

  var bucket = new mongodb.GridFSBucket(db);

  console.log('Uploading... (' + filePath + ')');

  fs.createReadStream(filePath).
  pipe(bucket.openUploadStream('one-more-night.mp3')).
  on('error', function(error) {
    assert.ifError(error);
  }).
  on('finish', function() {
    console.log('done!');
    process.exit(0);
  });
});