const http = require('http'); 
const os = require('os'); 
const path = require('path'); 
const EventEmitter = require('events'); 
const myEmitter = new EventEmitter(); 
myEmitter.on('serverStarted', (port) => { 
    console.log(` Server is running on port ${port}`); 
}); 
// System Information 
const systemInfo = { 
    platform: os.platform(), 
    architecture: os.arch(), 
    freeMemory: os.freemem(), 
    totalMemory: os.totalmem(), 
    homeDir: os.homedir(), 
}; 
// Create HTTP Server 
const server = http.createServer((req, res) => { 
    console.log(`Incoming request for: ${req.url}`); 
    if (req.url === "/") { 
        res.writeHead(200, { 'Content-Type': 'text/plain' }); 
        res.end("Welcome to My Custom Node.js Server! "); 
        return;  // <-- Prevents further execution 
    }  
    else if (req.url === "/info") { 
        res.writeHead(200, { 'Content-Type': 'application/json' }); 
        res.end(JSON.stringify(systemInfo, null, 2)); 
        return; 
    }  
    else if (req.url === "/file-path") { 
        res.writeHead(200, { 'Content-Type': 'text/plain' }); 
        res.end(`Requested File Path: ${__dirname}`); 
        return; 
    }  
    else { 
        res.writeHead(404, { 'Content-Type': 'text/plain' }); 
        res.end("404 Not Found"); 
        return; 
    }}); 
// Start Server 
const PORT = 3000; 
server.listen(PORT, () => { 
    console.log(` Server running at http://localhost:${PORT}`); 
    myEmitter.emit('serverStarted', PORT); 
}); 
