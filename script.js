
// MIRZANAGAR 360° Website JavaScript

const newsItems = [
  {
    title: "মির্জানগরের সর্বশেষ স্থানীয় সংবাদ",
    description: "এখানে এলাকার গুরুত্বপূর্ণ সংবাদ ও আপডেট প্রকাশ করা হবে।",
    category: "news",
    categoryName: "স্থানীয় সংবাদ",
    icon: "📰",
    date: "৫ নভেম্বর ২০২৬"
  },
  {
    title: "শিক্ষা ও শিক্ষার্থীদের অর্জন",
    description: "স্থানীয় শিক্ষাপ্রতিষ্ঠান ও শিক্ষার্থীদের সাফল্যের খবর।",
    category: "education",
    categoryName: "শিক্ষা",
    icon: "🎓",
    date: "৫ নভেম্বর ২০২৬"
  },
  {
    title: "স্থানীয় খেলাধুলার আয়োজন",
    description: "এলাকার ক্রীড়া প্রতিযোগিতা ও খেলাধুলার সংবাদ।",
    category: "sports",
    categoryName: "খেলাধুলা",
    icon: "⚽",
    date: "৫ নভেম্বর ২০২৬"
  },
  {
    title: "আমাদের ইতিহাস ও ঐতিহ্য",
    description: "মির্জানগরের ইতিহাস, সংস্কৃতি ও ঐতিহ্যের গল্প।",
    category: "culture",
    categoryName: "সংস্কৃতি",
    icon: "🏛️",
    date: "৫ নভেম্বর ২০২৬"
  },
  {
    title: "সমাজসেবামূলক উদ্যোগ",
    description: "মানুষের কল্যাণে স্থানীয় বিভিন্ন উদ্যোগের খবর।",
    category: "community",
    categoryName: "সমাজসেবা",
    icon: "🤝",
    date: "৫ নভেম্বর ২০২৬"
  },
  {
    title: "এলাকার বিশেষ আয়োজন ও অনুষ্ঠান",
    description: "স্থানীয় অনুষ্ঠান ও গুরুত্বপূর্ণ মুহূর্তের আপডেট।",
    category: "news",
    categoryName: "স্থানীয় সংবাদ",
    icon: "📸",
    date: "৫ নভেম্বর ২০২৬"
  }
];

const newsGrid = document.getElementById("newsGrid");
const searchInput = document.getElementById("newsSearch");
const categoryFilter = document.getElementById("categoryFilter");
const emptyMessage = document.getElementById("emptyMessage");

function renderNews() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;

  const filteredNews = newsItems.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.categoryName.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "all" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  newsGrid.innerHTML = filteredNews.map(item => `
    <article class="news-card">
      <div class="news-image" aria-hidden="true">${item.icon}</div>
      <div class="news-content">
        <span class="news-category">${item.categoryName}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="news-meta">${item.date} · MIRZANAGAR 360°</div>
      </div>
    </article>
  `).join("");

  emptyMessage.hidden = filteredNews.length !== 0;
}

searchInput.addEventListener("input", renderNews);
categoryFilter.addEventListener("change", renderNews);

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
  });
});

// Bangla and English language switch
let currentLanguage = "bn";
const languageToggle = document.getElementById("languageToggle");

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "bn" ? "en" : "bn";

  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-bn][data-en]").forEach(element => {
    element.textContent = element.dataset[currentLanguage];
  });

  languageToggle.textContent = currentLanguage === "bn" ? "EN" : "বাংলা";

  searchInput.placeholder =
    currentLanguage === "bn" ? "সংবাদ খুঁজুন..." : "Search news...";

  categoryFilter.options[0].text =
    currentLanguage === "bn" ? "সব বিভাগ" : "All Categories";
});

// Current year and date
document.getElementById("year").textContent =
  new Date().getFullYear();

document.getElementById("todayDate").textContent =
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

// First load
renderNews();
