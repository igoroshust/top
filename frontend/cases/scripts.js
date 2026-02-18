const posts = document.querySelector(".section-posts");
const post = document.querySelector(".section-posts__post");
const postsTitle = document.querySelector(".section-posts__title");
const postsBody = document.querySelector(".section-posts__body");
const postsAuthor = document.querySelector(".section-posts__author");

// const arrayPosts = [
//     {userId: 1, title: 'title-1', body: 'body-1'},
//     {userId: 2, title: 'title-2', body: 'body-2'},
//     {userId: 3, title: 'title-3', body: 'body-3'},
//     {userId: 4, title: 'title-4', body: 'body-4'},
// ]

// arrayPosts.map(item => {
//     let title = document.createElement('div');
//     title.textContent = item['title'];
//     post.appendChild(title);

//     let body = document.createElement('div');
//     body.textContent = item['body'];
//     post.appendChild(body);

//     let author = document.createElement('div');
//     author.textContent = item['userId'];
//     post.appendChild(author);

//     post.appendChild(document.createElement('br'));
// })

const url = "https://jsonplaceholder.typicode.com/posts/";

function fetchAPI() {
  try {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data = data.splice(0, 10);
        console.log(data);
        data.map((item) => {
          let post = document.createElement("div");
          post.classList.add(`section-posts__post`, `section-posts__post-${item["id"]}`);
          post.innerHTML = `<em>Post-${item["id"]}</em>`;
          posts.append(post);

          let title = document.createElement("div");
          title.classList.add('section-posts__title', `section-posts__title-${item["id"]}`);
          title.innerHTML = `<strong>Title:</strong> ${item["title"]}`;
          post.appendChild(title);

          let body = document.createElement("div");
          body.classList.add('section-posts__body', `section-posts__body-${item["id"]}`);
          body.innerHTML = `<strong>Body:</strong> ${item["body"]}`;
          post.appendChild(body);

          let author = document.createElement("div");
          author.classList.add('section-posts__author', `section-posts__author-${item["id"]}`);
          author.innerHTML = `<strong>Author:</strong> ${item["userId"]}`;
          post.appendChild(author);

          posts.appendChild(document.createElement("br"));
        });
        // postsTitle.textContent += data['title'];
        // postsBody.textContent += data['body'];
        // postsAuthor.textContent += data['userId'];
      })
      .catch((error) => console.error("Ошибка: ", error))
      .finally(console.log("Промис выполнен"));
  } catch (error) {
    console.error("Ошибка отлова: ", error);
  }
}

fetchAPI();

// const arrayPosts = [
//     {userId: 1, title: 'title-1', body: 'body-1'},
//     {userId: 2, title: 'title-2', body: 'body-2'},
//     {userId: 3, title: 'title-3', body: 'body-3'},
//     {userId: 4, title: 'title-4', body: 'body-4'},
// ]

// console.log(
//     arrayPosts.splice(1, 2)
// );

// const timerValue = document.querySelector('.section-timer__value');

// const buttonStart = document.querySelector('.section-timer__button--start');
// const buttonStop = document.querySelector('.section-timer__button--stop');
// const buttonReset = document.querySelector('.section-timer__button--reset');

// let counter = +timerValue.textContent;
// let intervalID;

// // Старт
// buttonStart.addEventListener('click', function(){
//     intervalID = setInterval(function(){
//         console.log('counter :>> ', counter);
//         counter++;
//         timerValue.textContent = counter;
//     }, 1000);
// });

// // Стоп
// buttonStop.addEventListener('click', function(){
//     clearInterval(intervalID);
// });

// // Сброс
// buttonReset.addEventListener('click', function(){
//     counter = 0;
//     timerValue.textContent = 0;
// });

// Найти список
// Создать кнопку
// Обработчик на кнопку с добавлением в конец

// const list = document.querySelector('.section-list__list');
// const listButton = document.querySelector('.section-list__button');
// const listForm = document.querySelector('#section-list__form')
// const formButton = document.querySelector('.section-list__form-button');

// const formInput = document.querySelector('.section-list__form-input');

// listButton.addEventListener('click', function(){
//     listButton.textContent = listForm.classList.contains('none') ? 'Скрыть' : 'Добавить';
//     listForm.classList.toggle('none');
// });

// listForm.addEventListener('submit', function(e){
//     e.preventDefault();

//     // Создать элемент
//     const newElement = document.createElement('li');

//     // Забить контент
//     newElement.textContent = formInput.value;

//     console.log('newElement :>> ', newElement);

//     // Добавить в list
//     list.append(newElement);
// });
