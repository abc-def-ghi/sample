const http = require('http');

const sessionStore = {};

function parseCookies(cookieHeader = '') {
    const cookies = {};
    cookieHeader.split(';').forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name && value) {
            cookies[name] = value;
        }
    });
    return cookies;
}

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
    }

    const cookies = parseCookies(req.headers.cookie);
    let sessionId = cookies.sessionId;

    if (!sessionId || !sessionStore[sessionId]) {
        sessionId = Math.random().toString(36).substring(2);
        sessionStore[sessionId] = { visits: 1 };
        res.setHeader('Set-Cookie', `sessionId=${sessionId}; HttpOnly`);
    } else {
        sessionStore[sessionId].visits += 1;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <html>
            <head>
                <title>Session Tracker</title>
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
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Welcome!</h1>
                    <p>Your visit count: <strong>${sessionStore[sessionId].visits}</strong></p>
                    <p>Refresh the page to increase the count.</p>
                </div>
            </body>
        </html>
    `);
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
