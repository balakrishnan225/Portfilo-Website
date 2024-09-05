import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(join(__dirname, "public")));

app.get("/api/projects", async (req, res) => {
 try {
  const username = "FXastro"; // Replace with your GitHub username
  const response = await fetch(`https://api.github.com/users/${username}/repos`);

  if (!response.ok) {
   throw new Error("Failed to fetch repositories");
  }

  const repos = await response.json();
  const projects = repos.map(repo => ({
   name: repo.name,
   description: repo.description,
   url: repo.html_url,
   language: repo.language,
   thumbnail: repo.owner.avatar_url,
  }));

  res.json(projects);
 } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Failed to fetch projects" });
 }
});

app.get("*", (req, res) => {
 res.sendFile(join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`);
});
