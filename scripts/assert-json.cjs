const fs = require('fs');
const files = ['package.json', 'app.json'];
files.forEach(f => {
  const buf = fs.readFileSync(f);
  if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
    // BOM detected, rewrite without BOM
    fs.writeFileSync(f, buf.slice(3));
    console.log(`Removed BOM from ${f}`);
  }
  try {
    JSON.parse(fs.readFileSync(f, 'utf8'));
    console.log(`${f} is valid JSON`);
  } catch (e) {
    console.error(`${f} is NOT valid JSON:`, e.message);
  }
});
