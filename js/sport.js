const SPORTS_API =
  "https://api.github.com/repos/mdimtiajulhoque/mirzanagar-360/contents/content/sports";

async function loadSports() {
  const container = document.getElementById("sports-posts");
  if (!container) return;

  try {
    const response = await fetch(SPORTS_API);
    if (!response.ok) throw new Error("Posts not found");

    const files = await response.json();

    for (const file of files) {
      if (!file.name.endsWith(".yaml") && !file.name.endsWith(".yml")) continue;

      const raw = await fetch(file.download_url);
      const yamlText = await raw.text();

      const title = yamlText.match(/title:\s*["']?(.+)["']?/)?.[1] || "Cricket Update";
      const description = yamlText.match(/description:\s*["']?(.+)["']?/)?.[1] || "";

      const card = document.createElement("article");
      card.className = "card";

      const heading = document.createElement("h3");
      heading.textContent = title;

      const paragraph = document.createElement("p");
      paragraph.textContent = description;

      card.append(heading, paragraph);
      container.appendChild(card);
    }
  } catch (error) {
    container.textContent = "Sports updates are coming soon.";
  }
}

loadSports();
