const zlib = require('zlib');
const dirs = ['../public/sitemap'];
const fs = require('fs');

dirs.forEach((dir) => {
  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith('.xml') && file !== 'sitemap.xml') {
      const fileContents = fs.createReadStream(dir + '/' + file);
      const writeStream = fs.createWriteStream(dir + '/' + file + '.gz');
      const zip = zlib.createGzip();

      fileContents
        .pipe(zip)
        .on('error', (err) => console.error(err))
        .pipe(writeStream)
        .on('error', (err) => console.error(err));
    }
  });
});
