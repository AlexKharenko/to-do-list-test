# Тестовое задание Junior Vue.js developer
Вам необходимо создать простое веб-приложение To-Do List, которое позволит пользователям добавлять, редактировать и удалять задачи.

Требования:

1. Используйте Vue.js для создания компонентов и управления состоянием приложения.
2. Интерфейс должен содержать следующие элементы:
   - Поле ввода для добавления новой задачи.
   - Кнопка "Добавить", чтобы добавить новую задачу в список.
   - Список добавленных задач с возможностью отметить         выполненные или удалить задачу.
   - Опционально: добавьте кнопку "Редактировать", чтобы пользователи могли изменить текст задачи после добавления.
3. Задачи должны сохраняться в состоянии приложения и не должны исчезать после перезагрузки страницы.
4. Верстка и дизайн могут быть простыми, но должны быть читабельными и эстетичными.


## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Install locally
Open the project directory and run next commands:

```
npm install
npm run dev
```

## Link to live demo

[ToDoApp](https://to-do-list-test-one.vercel.app/)

## Task solution

- In order for the tasks to remain on the page even after a reload, it was decided to store them in localStorage. For greater efficiency, the [VueUse]  (https://vueuse.org/) library has been installed, which offers many layouts. We used the composable [useStorage](https://vueuse.org/core/useStorage/#usestorage) which allows us to easily interact with localStorage and make the data reactive.
- Typescript was used to improve the development process and code readability.
- Custom components and dialogs were made.



