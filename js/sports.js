
const API_URL =
  "https://api.github.com/repos/mdimtiajulhoque/mirzanagar-360/contents/content/sports";

async function loadSports() {
  const container = document.getElementById("sports-posts");
  if (!container) return;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Sports folder not found");

    const files = await response.json();
    container.replaceChildren();

    for (const file of files) {
      if (!file.name.endsWith(".yaml") &&
          !file.name.endsWith(".yml")) continue;

      const rawResponse = await fetch(file.download_url);
      if (!rawResponse.ok) continue;

      const yaml = await rawResponse.text();

      function getField(name) {
        const regex = new RegExp("^" + name + ":\\s*(.*)$", "m");
        const match = yaml.match(regex);
        return match ? match[1].trim() : "";
      }

      const title = getField("title").replace(/^["']|["']$/g, "");
      const category = getField("category");
      const date = getField("date");
      const cover = getField("cover").replace(/^["']|["']$/g, "");

      const descriptionMatch = yaml.match(
        /^description:\s*[>|-]*\s*\n([\s\S]*)$/m
      );

      const description = descriptionMatch
        ? descriptionMatch[1]
            .split("\n")
            .map(line => line.replace(/^ {2}/, ""))
            .join("\n")
            .trim()
        : "";

      const card = document.createElement("article");
      card.className = "card";

      if (cover) {
        const image = document.createElement("img");
        image.src = new URL(cover, document.baseURI).href;
        image.alt = title;
        image.loading = "lazy";
        image.style.width = "100%";
        image.style.borderRadius = "12px";
        card.appendChild(image);
      }

      const heading = document.createElement("h3");
      heading.textContent = title || "Sports Update";
      card.appendChild(heading);

      const info = document.createElement("p");
      info.textContent = `${category} | ${date}`;
      card.appendChild(info);

      const content = document.createElement("div");
      content.style.whiteSpace = "pre-wrap";
      content.textContent = description
        .replace(/^## /gm, "")
        .replace(/\*\*/g, "");
      card.appendChild(content);

      container.appendChild(card);
    }

    if (!container.children.length) {
      container.textContent = "No sports posts found.";
    }

  } catch (error) {
    console.error("Sports loading error:", error);
    container.textContent = "Sports posts could not be loaded.";
  }
}

loadSports();

