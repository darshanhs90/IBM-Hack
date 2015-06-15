'use strict';

var watson = require('watson-developer-cloud');
var fs = require('fs');

var speech_to_text = watson.speech_to_text({
  username: '1a4e2a43-2a65-4e28-b9bc-2947c6a48e47',
  password: 'WNMkUbFzLf6c',
  version: 'v1'
});

var params = {
  // From file
  audio: fs.createReadStream('speech.wav'),
  content_type: 'audio/l16; rate=44100'
};

speech_to_text.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
