# Multilevel Menu Editor Vue

## Описание

Это проект для редактирования многоуровневых меню, построенный с использованием Vue.js и Node.js. В проекте используются Docker и Docker Compose для управления контейнерами. Редактирование доступно в админке (все пользователи лежат в БД). Логин/пароль админа - admin admin соотвественно, для пользователя - user user.

## Содержание

- **Фронтенд**: Vue.js приложение.
- **Бэкенд**: Node.js сервер.
- **База данных**: PostgreSQL.

## Требования

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Установка и запуск

1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/deluxe-catalyst/multilevel-menu-editor-vue.git
    ```

2. Перейдите в директорию проекта:

    ```bash
    cd multilevel-menu-editor-vue
    ```

3. Запустите контейнеры в фоновом режиме:

    ```bash
    docker-compose up -d
    ```

    Этот шаг создаст и запустит контейнеры для фронтенда, бэкенда и базы данных.

## Переменные окружения

Проект использует переменные окружения для настройки хостов (файл .env).

