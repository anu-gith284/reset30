import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("community.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT,
    avatar TEXT,
    category TEXT,
    day INTEGER,
    content TEXT,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    time TEXT,
    timestamp INTEGER
  )
`);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/posts", (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY timestamp DESC LIMIT 50").all();
    res.json(posts);
  });

  // WebSocket handling
  wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket");

    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        
        if (message.type === "NEW_POST") {
          const post = message.payload;
          const stmt = db.prepare(`
            INSERT INTO posts (user, avatar, category, day, content, likes, comments, time, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `);
          
          const info = stmt.run(
            post.user,
            post.avatar,
            post.category,
            post.day,
            post.content,
            post.likes || 0,
            post.comments || 0,
            post.time || "Just now",
            post.timestamp || Date.now()
          );

          const newPost = { ...post, id: info.lastInsertRowid };
          
          // Broadcast to all clients
          const broadcastMessage = JSON.stringify({
            type: "POST_ADDED",
            payload: newPost
          });

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(broadcastMessage);
            }
          });
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
