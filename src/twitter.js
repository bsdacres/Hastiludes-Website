var Twit = require('twit')
 
var T = new Twit({
  consumer_key:         '0jrUaO2cbZYWAP2Me3Up94ZXz',
  consumer_secret:      'XfSP1OwrgsuJc4YxM77y4W1xYLjEu7jKbZFjXvH28nStgrEh2x',
  access_token:         '1525142295762374656-qiHYPhlwTTsw5pA2w1oG53HRIYE0Uu',
  access_token_secret:  'oYfFK0PNGUGjCxHyHyCUTVhsKjcsW1c7XauVOwyP0cJ4L',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

T.get('search/tweets', { q: '#hastiludes', count: 100 }, function(err, data, response) {
    console.log(data)
  });
 
