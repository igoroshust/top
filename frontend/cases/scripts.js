const postsContainer = document.querySelector(".section-posts");

// Функция для получения данных
async function fetchPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
    if (!response.ok) {
      throw new Error(`HTTP ошибка: ${response.status}`);
    }
    const data = await response.json();
    return data.slice(0, 10); // Используем slice для неизменяемости
  } catch (error) {
    console.error("Ошибка при получении данных", error);
    throw error; // Перебрасываем ошибку для обработки выше
  }
}

// Функция для рендеринга постов
function renderPosts(posts) {
  const fragment = document.createDocumentFragment(); // Фрагмент для пакетного добавления

  posts.forEach((item) => {
    // Создаём контейнер для поста с innerHTML для всего содержимого
    const postElement = document.createElement("div");
    postElement.classList.add(
      "section-posts__post",
      `section-posts__post-${item.id}`,
    );
    postElement.innerHTML = `
      <em>Post-${item.id}</em>
      <div class="section-posts__title section-posts__title-${item.id}">
        <strong>Title:</strong> ${item.title}
      </div>
      <div class="section-posts__body section-posts__body-${item.id}">
        <strong>Body:</strong> ${item.body}
      </div>
      <div class="section-posts__author section-posts__author-${item.id}">
        <strong>Author:</strong> ${item.userId}
      </div>
      <br>
    `;
    fragment.appendChild(postElement);
  });
  postsContainer.appendChild(fragment); // Добавляем всё сразу
}

// Основная функция
async function loadAndDisplayPosts() {
  try {
    // Показываем индикатор загрузки
    // const loading = document.getElementById("loading");
    // if (loading) loading.style.display = "block";

    const posts = await fetchPosts();
    renderPosts(posts);

    // if (loading) loading.style.display = "none";
  } catch (error) {
    // Обработка ошибки: показываем сообщение пользователю
    postsContainer.innerHTML = "<p>Не удалось загрузить посты. Попробуйте позже.</p>";
    console.error("Ошибка в loadAndDisplayPosts:", error);
  }
}

// Запуск
loadAndDisplayPosts();
