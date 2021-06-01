-- ////////  customers TABLE  \\\\\\\\

-- get all current data in this table
SELECT * FROM customers;
-- insert items into this table, customer_id is automatic
INSERT INTO customers (`email`, `password`, `phone_number`, `trading_password`)
VALUES (:emailInput, :passwordInput, :phone_numberInput, :trading_passwordInput);
-- delete a user, based on PK
DELETE FROM customers WHERE `customer_id` = :customer_idInput;
-- delete a user, based on email input
DELETE FROM customers WHERE `email` = :emailInput;


-- ////////  wallets TABLE  \\\\\\\\

-- get all current data in this table
SELECT * FROM wallets;
-- insert items into this table, wallet_id is automatic
INSERT INTO wallets (`customer_id`, `balance`)
VALUES (:customer_idInput, :balanceInput);
-- delete a wallet for a given customer
DELETE FROM wallets WHERE `customer_id` = :customer_idInput;



-- ////////  coins TABLE  \\\\\\\\

-- get all current data in this table
SELECT * FROM coins;
-- insert items into this table, coin_id is automatic
INSERT INTO coins (`ticker`, `price`, `change_24hr`)
VALUES (:tickerInput, :priceInput, :change_24hrInput);
-- delete a coin, based on PK (possible fraud with coin, and it was eliminated from exchange)
DELETE FROM Coin WHERE `coin_id` = :coin_idInput;
-- delete a coin, based on ticker (possible fraud with coin, and it was eliminated from exchange)
DELETE FROM Coin WHERE `ticker` = :tickerInput;


-- ////////  orders TABLE  \\\\\\\\

-- get all current data in this table
SELECT * FROM orders;
-- insert items into this table, timestamp and order_id is automatic
INSERT INTO orders (`wallet_id`, `customer_id`, `type`, `coin_id`, `amount`, `completed`)
VALUES (:wallet_idInput, :customer_idInput, :typeInput, :coin_idInput, :amountInput, :completedInput);
-- delete an order, based on wallet_id
DELETE FROM orders WHERE `wallet_id` = :wallet_idInput;
-- delete an order, based on customer_id
DELETE FROM orders WHERE `customer_id` = :customer_idInput;
-- delete an order, based on coin_id
DELETE FROM orders WHERE `coin_id` = :coin_idInput;


-- ////////  Coin_wallet_junction TABLE [M:M] \\\\\\\\

-- get all current data in this table
SELECT * FROM Coin_wallet_junction;
-- insert items into this table
INSERT INTO Coin_wallet_junction (`coin_id`, `wallet_id`)
VALUES (:coin_idInput, :wallet_idInput);
-- delete items from this table
DELETE FROM Coin_wallet_junction WHERE `coin_id` = :coin_idInput AND `wallet_id` = :wallet_idInput;
-- view all coins info of a specific coin_id, %s will be something that the use chooses to look into.
SELECT * FROM coins
   INNER JOIN Coin_wallet_junction ON coins.coin_id = Coin_wallet_junction.coin_id
   WHERE Coin_wallet_junction.coin_id = %s;
-- view all wallets info of a specific wallet_id, %s will be something that the use chooses to look into.
SELECT * FROM wallets
   INNER JOIN Coin_wallet_junction ON wallets.wallet_id = Coin_wallet_junction.wallet_id
   WHERE Coin_wallet_junction.wallet_id = %s;