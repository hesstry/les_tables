DROP TABLE IF EXISTS `Coin_wallet_junction`;
DROP TABLE IF EXISTS `Orders`;
DROP TABLE IF EXISTS `Coins`;
DROP TABLE IF EXISTS `Wallets`;
DROP TABLE IF EXISTS `Customers`;

CREATE TABLE `Customers` (
    `customer_id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `phone_number` varchar(12) NOT NULL,
    `trading_password` varchar(255) NOT NUll,
    PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `Customers` (`email`, `password`, `phone_number`, `trading_password`)
VALUES
    ('madler@msn.com', 'ts7MoX4VgAFErS', '505-344-7736', 'ts7MoX4VgAFErSTRADING'),
    ('fraser@comcast.net', 'hJoioW2IboSFNN', '315-354-2869', 'hJoioW2IboSFNNTRADING'),
    ('nighthawk@yahoo.ca', 'An~hhmp4I53tTgK', '323-207-5576', 'An~hhmp4I53tTgKTRADING'),
    ('osaru@mac.com', 'WmvHR60ia39ZZ1', '413-230-0328', 'WmvHR60ia39ZZ1TRADING'),
    ('warrior@comcast.net', 'W~bPdhi1j1L~QEl', '804-624-6600', 'W~bPdhi1j1L~QElTRADING');



CREATE TABLE `Wallets` (
    `wallet_id` int(11) NOT NULL AUTO_INCREMENT,
    `customer_id` int(11) NOT NULL,
    `balance` FLOAT DEFAULT 0.0 NOT NULL,
    PRIMARY KEY (`wallet_id`),
    CONSTRAINT `wallets_customersFK` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `Wallets` (`customer_id`, `balance`)
VALUES
    (1, 10000.0),
    (2, 2000.0),
    (3, 3000.0),
    (4, 10.0),
    (5, 171717.0);



CREATE TABLE `Coins` (
    `coin_id` int(11) NOT NULL AUTO_INCREMENT,
    `ticker` varchar(10) NOT NULL UNIQUE,
    `price` FLOAT NOT NULL,
    `change_24hr` FLOAT NOT NULL,
    PRIMARY KEY (`coin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `Coins` (`ticker`, `price`, `change_24hr`)
VALUES
    ('BTC', 49809.40, 12.05),
    ('ETH', 3759.09, 12.63),
    ('BNB', 587.93, 12.20),
    ('USDT', 0.999870, 0.01),
    ('ADA', 1.69, 4.53),
    ('DOGE', 0.406842, 18.18),
    ('XRP', 1.29, 12.40),
    ('ICP', 291.43, 13.70),
    ('DOT', 37.94, 6.67),
    ('BCH', 1248.72, 17.38),
    ('UNI', 38.56, 8.75),
    ('LTC', 315.09, 17.33),
    ('LINK', 41.96, 13.02),
    ('USDC', 0.999465, 0.06),
    ('XLM', 0.588437, 0.588437),
    ('SOL', 41.90, 8.70),
    ('VET', 0.173977, 16.66),
    ('ETC', 86.82, 20.12),
    ('EOS', 10.52, 21.24),
    ('THETA', 9.29, 14.28);



CREATE TABLE `Orders` (
    `order_id` int(11) NOT NULL AUTO_INCREMENT,
    `wallet_id` int(11) NOT NULL,
    `customer_id` int(11) NOT NULL,
    `type` BOOLEAN NOT NULL,
    `coin_id` int(11),
    `amount` int(100) NOT NULL,
    `completed` BOOLEAN NOT NULL,
    `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`order_id`),
    CONSTRAINT `orders_walletsFK` FOREIGN KEY (`wallet_id`) REFERENCES `Wallets` (`wallet_id`),
    CONSTRAINT `orders_customersFK` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`),
    CONSTRAINT `orders_coinsFK` FOREIGN KEY (`coin_id`) REFERENCES `Coins` (`coin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
SET time_zone='+00:00';


INSERT INTO `Orders` (`wallet_id`, `customer_id`, `type`, `coin_id`, `amount`, `completed`)
VALUES
    (1, 1, 0, 1, 1, 1),
    (1, 1, 1, 1, 1, 1),
    (2, 2, 0, 3, 1, 1),
    (2, 2, 0, 4, 10, 1),
    (2, 2, 0, 2, 20, 1),
    (3, 3, 0, 6, 10000, 0),
    (3, 3, 0, 20, 25, 1),
    (4, 4, 0, 7, 33, 1),
    (4, 4, 0, 16, 2, 0),
    (4, 4, 0, 1, 4, 1),
    (5, 5, 0, 1, 4, 1);



CREATE TABLE `Coin_wallet_junction` (
    `coin_id` int(11) NOT NULL,
    `wallet_id` int(11) NOT NULL,
    PRIMARY KEY (`coin_id`, `wallet_id`),
    CONSTRAINT `coin_wallet_juction_coinsFK` FOREIGN KEY (`coin_id`) REFERENCES `Coins` (`coin_id`),
    CONSTRAINT `coin_wallet_junction_walletsFK` FOREIGN KEY (`wallet_id`) REFERENCES `Wallets` (`wallet_id`)
);


INSERT INTO `Coin_wallet_junction` (`coin_id`, `wallet_id`)
VALUES
    (1, 1),
    (3, 2),
    (4, 2),
    (2, 2),
    (6, 3),
    (2, 3),
    (7, 4),
    (1, 4),
    (1, 5);