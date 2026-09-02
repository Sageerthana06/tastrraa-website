const https = require('https');
const fs = require('fs');

const url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Autumn_leaf_%28transparent_background%29.png/320px-Autumn_leaf_%28transparent_background%29.png';
const file = fs.createWriteStream('c:/Users/HP/Downloads/tastrraa-website-main (1)/tastrraa-website-main/tastrraa-website-main/web/public/assets/real_leaf.png');

https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close(() => console.log('Downloaded real_leaf.png'));
  });
}).on('error', function(err) {
  fs.unlink('c:/Users/HP/Downloads/tastrraa-website-main (1)/tastrraa-website-main/tastrraa-website-main/web/public/assets/real_leaf.png');
  console.error('Error downloading:', err.message);
});
