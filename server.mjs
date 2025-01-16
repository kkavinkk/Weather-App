import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const PORT = 3000;
const HOST = '127.0.0.1';

// Function to determine Content-Type based on file extension
const getContentType = (filePath) => {
  const ext = extname(filePath);
  switch (ext) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    default: return 'text/plain';
  }
};

// Create server
const server = createServer(async (req, res) => {
  // Map requests to the corresponding file
  const filePath = join(
    './',
    req.url === '/' ? 'index.html' : req.url.substring(1)
  );

  try {
    const fileContent = await readFile(filePath);
    const contentType = getContentType(filePath);

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fileContent);
  } catch (err) {
    console.error(err);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Start server
server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
