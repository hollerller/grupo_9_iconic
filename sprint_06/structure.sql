DROP DATABASE IF EXISTS iconic_db;
CREATE DATABASE iconic_db;
USE iconic_db; -- Para abrir la base de datos que fue creada en el paso anterior

-- Para crear las claves foraneas, primero se deben crear las tablas con las claves primarias
-- Las foreing key deben tener los campos identicos a la PK

CREATE TABLE sizes(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100)
);

CREATE TABLE categories(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100)
);

CREATE TABLE genders(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100)
);


CREATE TABLE brands(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100)
);


CREATE TABLE products (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	price DECIMAL NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	description VARCHAR(1500),
	in_sale BOOLEAN NOT NULL,
	discount TINYINT UNSIGNED,
	image VARCHAR(100),
	size_id INT UNSIGNED NOT NULL,
	category_id INT UNSIGNED NOT NULL,
	gender_id INT UNSIGNED NOT NULL,
	brand_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (size_id) REFERENCES sizes(id),
	FOREIGN KEY (category_id) REFERENCES categories(id),
	FOREIGN KEY (gender_id) REFERENCES genders(id),
	FOREIGN KEY (brand_id) REFERENCES brands(id)
);

CREATE TABLE roles(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100)
);

CREATE TABLE country(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(100),
	countrycode VARCHAR(100)
);


CREATE TABLE users (
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	full_name VARCHAR(100) NOT NULL,
	user_name VARCHAR(100) UNIQUE NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	avatar VARCHAR(30) NOT NULL,
	password VARCHAR(100) NOT NULL,
	birthday DATE NOT NULL,
	role_id INT UNSIGNED NOT NULL,
	country_id INT UNSIGNED NOT NULL,
	FOREIGN KEY (role_id) REFERENCES roles(id),
	FOREIGN KEY (country_id) REFERENCES country(id)
);

CREATE TABLE orders(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 	total DECIMAL NOT NULL,
 	status VARCHAR(100),
 	order_address VARCHAR(100) NOT NULL,
 	cellphone VARCHAR(15) NOT NULL,
 	user_id INT UNSIGNED NOT NULL,
 	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_detail(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
 	order_id INT UNSIGNED NOT NULL,
 	product_id INT UNSIGNED NOT NULL,
 	quantity INT UNSIGNED NOT NULL,
 	FOREIGN KEY (order_id) REFERENCES orders(id),
 	FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Sizes

INSERT INTO sizes VALUES (1, 'XS');
INSERT INTO sizes VALUES (2, 'S');
INSERT INTO sizes VALUES (3, 'M');
INSERT INTO sizes VALUES (4, 'L');
INSERT INTO sizes VALUES (5, 'XL');


INSERT INTO categories VALUES (1, 'clothing');
INSERT INTO categories VALUES (2, 'casual-clothing');
INSERT INTO categories VALUES (3, 'accesories');
INSERT INTO categories VALUES (4, 'accesory');


INSERT INTO brands VALUES (1, 'Lec lee');
INSERT INTO brands VALUES (2, 'Only');
INSERT INTO brands VALUES (3, 'Lafayette');
INSERT INTO brands VALUES (4, 'Desiderata');
INSERT INTO brands VALUES (5, 'Levis');
INSERT INTO brands VALUES (6, 'Americanino');

INSERT INTO genders VALUES (1, 'Men');
INSERT INTO genders VALUES (2, 'Women');
INSERT INTO genders VALUES (3, 'Unisex');


INSERT INTO country VALUES (1, 'Argentina', '+57');
INSERT INTO country VALUES (2, 'Colombia', '+54');

INSERT INTO roles VALUES (1, 'Comprador');
INSERT INTO roles VALUES (2, 'Vendedor');

INSERT INTO users VALUES (1, 'Belen Lopez', 'blopez123', 'belen@hotmail.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
                          '1659674713248_img_.png', '$2a$10$mw9KOspWFmItqkur8vVMl.9jiIENSVzMHYUoAG0kIiGcjUfdgr5cC',
                          '1990-12-21 00:00:00', 1, 1);
INSERT INTO users VALUES (2, 'David Tobasura', 'hollerller', 'david@gmail.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
                          '1659332407881_img_.png', '$2a$10$23MAxa3BAV61n9EbGUUWO.0NE.MsDQlwzYxU4zHAlioLrmFro8Fry',
                          '1991-10-16 00:00:00', 1, 2);


INSERT INTO products VALUES (1, 'Prueba Archivo', 70000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'test test test test test ', TRUE, 10, '1658697801480_img_.jpg', 1, 1, 2, 1);
INSERT INTO products VALUES (2, 'hoodie-Apollo', 1770, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 20, 'prod1.jpg', 4, 2, 1, 3);
INSERT INTO products VALUES (3, 'skirt-Emma', 8830, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 30, 'prod3.jpg', 3, 3, 2, 5);
INSERT INTO products VALUES (4, 'short-Crawfish', 7290, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 4, 'prod2.jpg', 2, 2, 1, 6);
INSERT INTO products VALUES (5, 'Artichoke - Bottom, Test ', 10000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Descripcion do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', TRUE, 10, '1658580650008_img_.png', 2, 4, 1, 5);
INSERT INTO products VALUES (6, 'skirt-Rita', 7870, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 6, 'prod5.jpg', 2, 2, 2, 3);
INSERT INTO products VALUES (7, 't-shirt - Fillets', 3790, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 7, 'newArrivals3.jpg', 2, 2, 2, 6);
INSERT INTO products VALUES (8, 'hoodie-Flower', 1210, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 8, 'prod3.jpg', 5, 2, 2, 3);
INSERT INTO products VALUES (9, 'angel-earings', 7050, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 9, 'prod2.jpg', 1, 3, 3, 5);
INSERT INTO products VALUES (10, 'winter-hat', 2760, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 10, 'prod5(2).jpg', 5, 3, 3, 5);
INSERT INTO products VALUES (11, 'gloves -oh Henry', 1340, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 11, 'prod3.jpg', 3, 3, 2, 5);
INSERT INTO products VALUES (12, 'Rambutan', 7990, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 12, 'prod1.jpg', 2, 2, 2, 1);
INSERT INTO products VALUES (13, 'Corn Meal', 4620, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 13, 'prod5.jpg', 4, 3, 1, 4);
INSERT INTO products VALUES (14, 'Island Oasis - Pina Colada', 1150, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 14, 'prod1.jpg', 3, 2, 1, 6);
INSERT INTO products VALUES (15, 'Pepper - Red, Finger Hot', 9760, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 15, 'prod3.jpg', 2, 3, 2, 5);
INSERT INTO products VALUES (16, 'Oil - Peanut', 8690, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 16, 'prod5(2).jpg', 5, 3, 2, 2);
INSERT INTO products VALUES (17, 'Chocolate - White', 4908, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 17, 'prod3.jpg', 2, 2, 1, 4);
INSERT INTO products VALUES (18, 'Olives - Green, Pitted', 7780, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 18, 'prod3.jpg', 2, 3, 3, 6);
INSERT INTO products VALUES (19, 'hoodie-Emma', 4350, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 19, 'prod2.jpg', 3, 2, 3, 5);
INSERT INTO products VALUES (20, 'Artichokes - Knobless, White', 8160, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 20, 'prod5(2).jpg', 4, 3, 3, 2);
INSERT INTO products VALUES (21, 'hoodie-Emma', 8430, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 21, 'prod1.jpg', 2, 3, 1, 5);
INSERT INTO products VALUES (22, 'Cornish Hen', 9740, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 22, 'prod3.jpg', 5, 2, 2, 1);
INSERT INTO products VALUES (23, 'Myers Planters Punch', 6540, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 23, 'newArrivals3.jpg', 2, 3, 1, 6);
INSERT INTO products VALUES (24, 'Flour - Bran, Red', 8200, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 24, 'prod5.jpg', 1, 2, 1, 5);
INSERT INTO products VALUES (25, 'Mahi Mahi', 1050, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 25, 'prod2.jpg', 3, 3, 2, 4);
INSERT INTO products VALUES (26, 'hoodie-Ren', 5799, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 26, 'newArrivals3.jpg', 4, 3, 1, 1);
INSERT INTO products VALUES (27, 'Cheese - Victor Et Berthold', 6010, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 27, 'prod1.jpg', 1, 2, 2, 4);
INSERT INTO products VALUES (28, 'Dc - Frozen Momji', 5310, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 28, 'prod5(2).jpg', 2, 2, 2, 4);
INSERT INTO products VALUES (29, 'Soup - Campbells, Butternut', 3320, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 9, 'prod1.jpg', 3, 3, 1, 2);
INSERT INTO products VALUES (30, 'Bread - Rosemary Focaccia', 3440, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 30, 'prod5.jpg', 4, 2, 1, 3);
INSERT INTO products VALUES (31, 'Bacardi Mojito', 2120, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 31, 'newArrivals3.jpg', 3, 3, 1, 2);
INSERT INTO products VALUES (32, 'Kumquat', 4220, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 32, 'prod1.jpg', 5, 3, 1, 4);
INSERT INTO products VALUES (33, 'Vanilla Beans', 4790, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 33, 'newArrivals3.jpg', 4, 2, 3, 4);
INSERT INTO products VALUES (34, 'Chocolate - Mi - Amere Semi', 3310, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 34, 'prod5(2).jpg', 2, 2, 1, 6);
INSERT INTO products VALUES (35, 'Cognac - Courvaisier', 8000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 35, 'prod5.jpg', 4, 2, 2, 2);
INSERT INTO products VALUES (36, 'hoodie-Ren', 2200, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 36, 'prod1.jpg', 4, 2, 1, 4);
INSERT INTO products VALUES (37, 'Bread - Multigrain', 5410, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 37, 'prod4.jpg', 3, 3, 1, 3);
INSERT INTO products VALUES (38, 'Pastry - Raisin Muffin - Mini', 9960, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 38, 'prod5(2).jpg', 3, 2, 3, 4);
INSERT INTO products VALUES (39, 'Five Alive Citrus', 3650, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 39, 'prod1.jpg', 3, 2, 3, 6);
INSERT INTO products VALUES (40, 'Anchovy In Oil', 5500, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 20, 'prod4.jpg', 1, 3, 3, 3);
INSERT INTO products VALUES (41, 'Puree - Mocha', 3500, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 21, 'prod5.jpg', 4, 2, 3, 4);
INSERT INTO products VALUES (42, 'Ice Cream Bar - Hagen Daz', 5870, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 22, 'prod1.jpg', 3, 3, 1, 4);
INSERT INTO products VALUES (43, 'Scallops - 20/30', 2410, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 23, 'prod5(2).jpg', 2, 3, 3, 5);
INSERT INTO products VALUES (44, 'Salt And Pepper Mix - White', 7630, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 24, 'prod2.jpg', 4, 3, 2, 1);
INSERT INTO products VALUES (45, 'Vinegar - Tarragon', 2910, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 25, 'newArrivals3.jpg', 3, 2, 3, 4);
INSERT INTO products VALUES (46, 'Island Oasis - Ice Cream Mix', 3920, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 26, 'prod1.jpg', 4, 3, 2, 1);
INSERT INTO products VALUES (47, 'Glass - Juice Clear 5oz 55005', 7240, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 27, 'prod4.jpg', 2, 2, 1, 1);
INSERT INTO products VALUES (48, 'Wine - Toasted Head', 9330, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 28, 'prod5(2).jpg', 5, 3, 1, 1);
INSERT INTO products VALUES (49, 'Kahlua', 2460, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 29, 'prod5.jpg', 4, 3, 2, 2);
INSERT INTO products VALUES (50, 'Cheese - Fontina', 4690, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 30, 'prod2.jpg', 4, 2, 1, 3);
INSERT INTO products VALUES (51, 'Beef - Roasted, Cooked', 9760, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 31, 'prod1.jpg', 4, 2, 3, 2);
INSERT INTO products VALUES (52, 'Sauce - Soya, Dark', 5390, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 32, 'prod5(2).jpg', 2, 3, 1, 3);
INSERT INTO products VALUES (53, 'Wine - Two Oceans Sauvignon', 7690, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 33, 'prod3.jpg', 1, 3, 1, 3);
INSERT INTO products VALUES (54, 'Sherbet - Raspberry', 6030, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 34, 'prod4.jpg', 3, 2, 3, 4);
INSERT INTO products VALUES (55, 'Puff Pastry - Sheets', 7700, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 35, 'prod2.jpg', 3, 2, 1, 4);
INSERT INTO products VALUES (56, 'Muffin - Mix - Bran And Maple 15l', 9530, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 16, 'newArrivals3.jpg', 4, 2, 2, 2);
INSERT INTO products VALUES (57, 'Pepsi - Diet, 355 Ml', 5820, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 17, 'prod1.jpg', 5, 2, 2, 2);
INSERT INTO products VALUES (58, 'Tea - Mint', 2880, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 18, 'prod5.jpg', 5, 2, 1, 6);
INSERT INTO products VALUES (59, 'Wine - Touraine Azay - Le - Rideau', 8520, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 19, 'prod5(2).jpg', 4, 3, 1, 6);
INSERT INTO products VALUES (60, 'Compound - Rum', 3560, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 20, 'prod3.jpg', 4, 2, 2, 2);
INSERT INTO products VALUES (61, 'Pastry - Lemon Danish - Mini', 3520, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 21, 'prod1.jpg', 3, 2, 2, 5);
INSERT INTO products VALUES (62, 'Grenadillo', 3430, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 22, 'prod4.jpg', 4, 2, 1, 5);
INSERT INTO products VALUES (63, '7up Diet, 355 Ml', 7780, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 23, 'prod5.jpg', 3, 3, 3, 3);
INSERT INTO products VALUES (64, 'Island Oasis - Lemonade', 6950, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 24, 'newArrivals3.jpg', 3, 2, 3, 2);
INSERT INTO products VALUES (65, 'Cheese - Havarti, Salsa', 5708, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 25, 'prod5.jpg', 5, 2, 1, 2);
INSERT INTO products VALUES (66, 'Wine - Touraine Azay - Le - Rideau', 5000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 26, 'prod5.jpg', 3, 3, 1, 3);
INSERT INTO products VALUES (67, 'Melon - Honey Dew', 8230, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 27, 'prod2.jpg', 5, 3, 1, 2);
INSERT INTO products VALUES (68, 'Lamb - Whole Head Off', 7430, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 28, 'prod3.jpg', 4, 3, 3, 3);
INSERT INTO products VALUES (69, 'Nut - Hazelnut, Ground, Natural', 3087, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 29, 'prod5.jpg', 4, 2, 3, 6);
INSERT INTO products VALUES (70, 'Corn Shoots', 4108, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 30, 'newArrivals3.jpg', 4, 2, 2, 2);
INSERT INTO products VALUES (71, 'Beef - Tenderloin Tails', 4280, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 31, 'prod4.jpg', 4, 2, 1, 1);
INSERT INTO products VALUES (72, 'Apples - Spartan', 2540, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 32, 'prod4.jpg', 1, 2, 3, 1);
INSERT INTO products VALUES (73, 'Horseradish - Prepared', 8250, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 35, 'prod5.jpg', 2, 3, 2, 6);
INSERT INTO products VALUES (74, 'Langers - Mango Nectar', 9680, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 34, 'prod5.jpg', 4, 2, 1, 3);
INSERT INTO products VALUES (75, 'Glass Clear 7 Oz Xl', 7030, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 35, 'prod4.jpg', 1, 3, 2, 5);
INSERT INTO products VALUES (76, 'Table Cloth 90x90 Colour', 7590, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 36, 'prod5(2).jpg', 4, 2, 1, 5);
INSERT INTO products VALUES (77, 'Table Cloth 144x90 White', 7000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 37, 'prod3.jpg', 4, 3, 3, 5);
INSERT INTO products VALUES (78, 'Puree - Raspberry', 5700, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 38, 'prod4.jpg', 2, 2, 3, 5);
INSERT INTO products VALUES (79, 'Chicken - Leg, Boneless', 9850, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 39, 'prod5(2).jpg', 4, 3, 1, 3);
INSERT INTO products VALUES (80, 'Muffin - Blueberry Individual', 9870, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 40, 'prod5.jpg', 4, 3, 1, 2);
INSERT INTO products VALUES (81, 'Rye Special Old', 8390, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 41, 'prod5.jpg', 1, 2, 1, 4);
INSERT INTO products VALUES (82, 'Ice Cream - Chocolate', 7910, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 42, 'newArrivals3.jpg', 2, 2, 2, 1);
INSERT INTO products VALUES (83, 'Cheese - Le Cheve Noir', 3380, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 43, 'prod4.jpg', 1, 3, 2, 4);
INSERT INTO products VALUES (84, 'Lamb Tenderloin Nz Fr', 9808, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 44, 'prod5(2).jpg', 4, 2, 1, 3);
INSERT INTO products VALUES (85, 'Bread - Rosemary Focaccia', 5710, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 45, 'prod5.jpg', 4, 3, 2, 4);
INSERT INTO products VALUES (86, 'Sherbet - Raspberry', 690, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 24, 'prod4.jpg', 3, 3, 3, 6);
INSERT INTO products VALUES (87, 'tshirt-Cookie', 2070, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 47, 'prod2.jpg', 4, 3, 1, 5);
INSERT INTO products VALUES (88, 'Nut - Hazelnut, Whole', 5310, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 48, 'prod5.jpg', 4, 3, 1, 6);
INSERT INTO products VALUES (89, 'Black Currants', 7310, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 49, 'prod5.jpg', 5, 2, 1, 2);
INSERT INTO products VALUES (90, 'Dried Peach', 9100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 50, 'newArrivals3.jpg', 3, 3, 2, 1);
INSERT INTO products VALUES (91, 'Chocolate Bar - Coffee Crisp', 2478, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 51, 'newArrivals3.jpg', 4, 2, 2, 6);
INSERT INTO products VALUES (92, 'Coffee - Ristretto Coffee Capsule', 9910, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 52, 'prod3.jpg', 4, 2, 3, 2);
INSERT INTO products VALUES (93, 'Bagelers - Cinn / Brown', 6820, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', FALSE, 53, 'prod4.jpg', 4, 3, 3, 5);
INSERT INTO products VALUES (94, 'Chinese Foods - Pepper Beef', 5140, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 54, 'prod5.jpg', 4, 3, 2, 2);
INSERT INTO products VALUES (95, 'Appetizer - Asian Shrimp Roll', 4550, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 55, 'prod3.jpg', 1, 2, 2, 5);
INSERT INTO products VALUES (96, 'Wine - Beringer Founders Estate', 1848, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 56, 'prod2.jpg', 4, 3, 3, 6);
INSERT INTO products VALUES (97, 'Ocean Spray - Kiwi Strawberry', 8907, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 5, 'prod5.jpg', 5, 2, 2, 5);
INSERT INTO products VALUES (98, 'Syrup - Monin, Irish Cream', 8189, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 58, 'prod4.jpg', 3, 3, 2, 3);
INSERT INTO products VALUES (99, 'Sauce Bbq Smokey', 8910, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 19, 'prod5.jpg', 5, 3, 2, 6);
INSERT INTO products VALUES (100, 'Eggplant - Regular', 5280, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', TRUE, 10, 'prod5.jpg', 2, 2, 2, 6);
INSERT INTO products VALUES (101, 'adsfasd', 32, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'fasfa', FALSE, 12, '1658248167195_img_.jpg', 5, 4, 2, 5);
INSERT INTO products VALUES (102, 'life', 3008, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'dsfs', FALSE, 4, '1658248771149_img_.jpg', 5, 1, 1, 1);
INSERT INTO products VALUES (103, 'Campera de Jean - Wrangler', 10000, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Descripcion do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', FALSE, 34, '1658256581648_img_.jpg', 5, 3, 2, 6);
INSERT INTO products VALUES (104, 'prueba', 34556, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'test test test test test ', TRUE, 4, '1659210657579_img_.jpg', 5, 1, 2, 5);

INSERT INTO orders VALUES (1, CURRENT_TIMESTAMP, 75000, 'CREATED', 'Carrera 123 # 12 - 18', '3233223332', 1);
INSERT INTO orders VALUES (2, CURRENT_TIMESTAMP, 120000, 'CREATED', 'Calle 3 # 54 -12', '9123123567', 2);

INSERT INTO order_detail VALUES (1, 1, 10, 1);
INSERT INTO order_detail VALUES (2, 1, 1, 2);
INSERT INTO order_detail VALUES (3, 1, 10, 1);
INSERT INTO order_detail VALUES (4, 2, 23, 2);
INSERT INTO order_detail VALUES (5, 2, 56, 1);
INSERT INTO order_detail VALUES (6, 2, 4, 1);
INSERT INTO order_detail VALUES (7, 2, 40, 3);