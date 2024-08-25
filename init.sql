CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    rules BOOLEAN NOT NULL
);

CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    parent_id INT DEFAULT NULL,
    title VARCHAR(255) NOT NULL,
    link TEXT,
    content TEXT,
    FOREIGN KEY (parent_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

ALTER TABLE users
    ADD COLUMN "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE menu_items
    ADD COLUMN "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

------------------------------------------------------------- вставка данных

INSERT INTO users (username, password, rules) VALUES
('admin', 'admin', TRUE),
('user', 'user', FALSE);

INSERT INTO menu_items (parent_id, title, link, content) VALUES
(NULL, 'Главная', '/', 'Главная страница'),
(1, 'Каталог', '/catalog', 'Каталог товаров'),
(2, 'Стулья', '/chairs', 'Каталог стульев'),
(2, 'Столы', '/tables', 'Каталог столов'),
(4, 'Компьютерные', '/computerdesks', 'Каталог компьютерных столов'),
(4, 'Журнальные', '/coffetables', 'Каталог журнальных столов'),

(1, 'Услуги', '/services', 'Услуги компании'),

(NULL, 'Контакты', '/contacts', 'Страница контактов'),
(8, 'О нас', '/aboutus', 'О компании'),
(8, 'Вакансии', '/job', 'Работа у нас');