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
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        res.end(`
            <html>
                <head>
                    <title>Custom Node.js Server</title>
                    <style>
                        body {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            font-family: Arial, sans-serif;
                            background-color: #f0f8ff;
                        }
                        .container {
                            text-align: center;
                            padding: 20px;
                            background: white;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        }
                        button {
                            margin: 10px;
                            padding: 10px 20px;
                            font-size: 16px;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            background-color: #007bff;
                            color: white;
                        }
                        button:hover {
                            background-color: #0056b3;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Welcome to My Custom Node.js Server!</h1>
                        <button onclick="window.location.href='/info'">View System Info</button>
                        <button onclick="window.location.href='/file-path'">View File Path</button>
                        <button onclick="window.location.href='/'">Same Page</button>
                    </div>
                </body>
            </html>
        `);
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
    }
}); 
// Start Server 
const PORT = 3000; 
server.listen(PORT, () => { 
    console.log(` Server running at http://localhost:${PORT}`); 
    myEmitter.emit('serverStarted', PORT); 
});
