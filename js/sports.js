const API_URL =
  "https://api.github.com/repos/mdimtiajulhoque/mirzanagar-360/contents/content/sports";

async function loadSports() {
  const container = document.getElementById("sports-posts");

  if (!container) return;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Could not load sports folder");
    }

    const files = await response.json();

    container.replaceChildren();

    for (const file of files) {
      if (!/\.(yaml|yml|json)$/i.test(file.name)) continue;

      const fileResponse = await fetch(file.download_url);
      const content = await fileResponse.text();

      let post;

      if (file.name.endsWith(".json")) {
        post = JSON.parse(content);
      } else {
        // Simple YAML field reader
        const getField = (name) => {
          const match = content.match(
            new RegExp("^" + name + ":\\\\s*(.*)$", "m")
          );
          return match ? match[1].replace(/^["']|["']$/g, "") : "";
        };

        post = {
          title: getField("title"),
          category: getField("category"),
          description: getField("description"),
          date: getField("date"),
          cover: getField("cover")
        };
      }

      const card = document.createElement("article");
      card.className = "card";

      const title = document.createElement("h3");
      title.textContent = post.title || "Sports Update";

      const category = document.createElement("p");
      category.textContent = post.category || "Sports";

      const description = document.createElement("p");
      description.textContent = post.description || "";

      card.append(title, category, description);

      if (post.cover) {
        const img = document.createElement("img");
        img.src = post.cover;
        img.alt = post.title || "Sports photo";
        img.loading = "lazy";
        card.prepend(img);
      }

      container.appendChild(card);
    }

    if (!container.children.length) {
      container.textContent = "No sports posts available yet.";
    }

  } catch (error) {
    console.error(error);
    container.textContent = "Sports posts could not be loaded.";
  }
}

loadSports();
