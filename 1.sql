CREATE DATABASE gift_recommendation;
USE gift_recommendation;
USE gift_recommendation;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE gift_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    recipient_name VARCHAR(100),
    relationship VARCHAR(50),
    occasion VARCHAR(50),
    age_range VARCHAR(50),
    gender VARCHAR(20),
    interests TEXT,
    budget_min INT,
    budget_max INT,
    special_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL
);
CREATE TABLE gifts (
    gift_id INT AUTO_INCREMENT PRIMARY KEY,
    gift_name VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    amazon_link VARCHAR(500),
    rating FLOAT DEFAULT 0,
    reviews_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);
CREATE TABLE user_search_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    request_id INT NOT NULL,
    recommended_gift_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (request_id) REFERENCES gift_requests(request_id) ON DELETE CASCADE,
    FOREIGN KEY (recommended_gift_id) REFERENCES gifts(gift_id) ON DELETE CASCADE
);
INSERT INTO categories (category_name) VALUES
('Tech Gadgets'),
('Home & Living'),
('Fashion & Accessories'),
('Sports & Outdoors'),
('Books & Stationery'),
('Health & Wellness');
SELECT * FROM categories;
-- Insert sample gifts into the gifts table
INSERT INTO gifts (gift_name, category_id, price, description, image_url, amazon_link, rating, reviews_count) VALUES
('Apple Watch Series 8', 1, 41999.00, 'Advanced smartwatch with health tracking and notifications.', 'https://picsum.photos/400/320?random=10', 'https://www.amazon.in/Apple-Watch-Space-Grey-Aluminium/dp/B0BDJ6ZMCC/', 4.8, 1234),
('Apple AirPods Pro', 1, 24999.00, 'Active noise cancellation and spatial audio.', 'https://picsum.photos/400/320?random=11', 'https://www.amazon.in/Apple-AirPods-Pro-Active-Cancellation/dp/B0BDJ6ZMCC/', 4.6, 856),
('Philips Smart LED Bulb', 2, 1999.00, 'WiFi-enabled LED bulb with 16 million colors.', 'https://picsum.photos/400/320?random=13', 'https://www.amazon.in/Philips-WiFi-Enabled-Color-Changing-Bulb/dp/B0BDJ6ZMCC/', 4.5, 789),
('Urban Forest Leather Wallet', 3, 1999.00, 'Genuine leather wallet with multiple card slots.', 'https://picsum.photos/400/320?random=16', 'https://www.amazon.in/Urban-Forest-Leather-Wallet-Brown/dp/B0BDJ6ZMCC/', 4.8, 234),
('Decathlon Yoga Mat', 4, 1499.00, 'Non-slip yoga mat with carrying strap.', 'https://picsum.photos/400/320?random=19', 'https://www.amazon.in/Anti-Slip-Yoga-Mat-Carrying-Strap/dp/B07P8QZ6KX/', 4.7, 456);
INSERT INTO gift_requests (user_id, recipient_name, relationship, occasion, age_range, gender, interests, budget_min, budget_max, special_notes) VALUES
(NULL, 'John Doe', 'Friend', 'Birthday', 'Young Adult (20-29)', 'Male', 'Gaming, Technology', 2000, 10000, 'Prefers latest gadgets'),
(NULL, 'Sarah Smith', 'Partner', 'Anniversary', 'Adult (30-49)', 'Female', 'Fashion, Jewelry', 5000, 20000, 'Loves designer accessories'),
(NULL, 'David Johnson', 'Family', 'Graduation', 'Teen (13-19)', 'Male', 'Books, Music', 1000, 5000, 'Enjoys reading and playing guitar'),
(NULL, 'Emma Brown', 'Colleague', 'Farewell', 'Middle Age (50-64)', 'Female', 'Home Decor, Gardening', 1500, 8000, 'Moving to a new house'),
(NULL, 'Michael Lee', 'Friend', 'Wedding', 'Adult (30-49)', 'Male', 'Sports, Fitness', 3000, 15000, 'Plays tennis regularly');
SELECT * FROM gift_requests;
SELECT * FROM gift_requests;
SELECT g.gift_name, c.category_name, g.price, g.rating
FROM gifts g
JOIN categories c ON g.category_id = c.category_id;
SELECT * FROM gifts WHERE price BETWEEN 2000 AND 10000;
SELECT g.gift_name, c.category_name, g.price, g.rating
FROM gifts g
JOIN categories c ON g.category_id = c.category_id;
SELECT * FROM gifts WHERE price BETWEEN 200 AND 10000;SELECT * FROM gift_requests WHERE occasion = 'Birthday';
SELECT * FROM gift_requests;
SELECT * FROM gift_requests WHERE occasion = 'Birthday';

SELECT g.gift_name, c.category_name, g.price, g.rating
FROM gifts g
JOIN categories c ON g.category_id = c.category_id;

