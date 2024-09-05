import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fetch from "node-fetch";
import { load } from "cheerio";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(join(__dirname, "public")));

// Function to fetch repository thumbnail
async function fetchRepoThumbnail(repoUrl) {
 try {
  const response = await fetch(repoUrl);
  const html = await response.text();
  const $ = load(html); // Load HTML into Cheerio

  // Extract the Open Graph image
  const thumbnailUrl = $('meta[property="og:image"]').attr("content");
  return thumbnailUrl || ""; // Return thumbnail URL or empty string if not found
 } catch (error) {
  console.error(`Failed to fetch thumbnail for ${repoUrl}:`, error);
  return ""; // Return an empty string in case of error
 }
}

// GitHub API Endpoint to fetch repositories
app.get("/api/projects", async (req, res) => {
 try {
  const username = "FXastro"; // Replace with your GitHub username
  const response = await fetch(`https://api.github.com/users/${username}/repos`);

  if (!response.ok) {
   throw new Error("Failed to fetch repositories");
  }

  const repos = await response.json();
  const projects = [];

  // Fetch thumbnails for each repository sequentially using async/await
  for (const repo of repos) {
   const thumbnail = await fetchRepoThumbnail(repo.html_url); // Fetch the thumbnail URL
   projects.push({
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    language: repo.language,
    thumbnail, // Include fetched thumbnail URL
   });
  }

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
