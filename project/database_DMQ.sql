-- ////////  Customers TABLE  \\\\\\\\

-- get all current data in this table
SELECT * FROM Customers;
-- insert items into this table, customer_id is automatic
INSERT INTO Customers (`email`, `password`, `phone_number`, `trading_password`)
VALUES (:emailInput, :passwordInput, :phone_numberInput, :trading_passwordInput);
-- delete a user, based on PK
DELETE FROM Customers WHERE `customer_id` = :customer_idInput;
-- delete a user, based on email input
DELETE FROM Customers WHERE `email` = :emailInput;


-- ////////  Wallets TABLE  \\\\\\\\

-- get all current data in this table
SELECT * FROM Wallets;
-- insert items into this table, wallet_id is automatic
INSERT INTO Wallets (`customer_id`, `balance`)
VALUES (:customer_idInput, :balanceInput);
-- delete a wallet for a given customer
DELETE FROM Wallets WHERE `customer_id` = :customer_idInput;



-- ////////  Coins TABLE  \\\\\\\\

-- get all current data in this table
SELECT * FROM Coins;
-- insert items into this table, coin_id is automatic
INSERT INTO Coins (`ticker`, `price`, `change_24hr`)
VALUES (:tickerInput, :priceInput, :change_24hrInput);
-- delete a coin, based on PK (possible fraud with coin, and it was eliminated from exchange)
DELETE FROM Coin WHERE `coin_id` = :coin_idInput;
-- delete a coin, based on ticker (possible fraud with coin, and it was eliminated from exchange)
DELETE FROM Coin WHERE `ticker` = :tickerInput;


-- ////////  Orders TABLE  \\\\\\\\

-- get all current data in this table
SELECT * FROM Orders;
-- insert items into this table, timestamp and order_id is automatic
INSERT INTO Orders (`wallet_id`, `customer_id`, `type`, `coin_id`, `amount`, `completed`)
VALUES (:wallet_idInput, :customer_idInput, :typeInput, :coin_idInput, :amountInput, :completedInput);
-- delete an order, based on wallet_id
DELETE FROM Orders WHERE `wallet_id` = :wallet_idInput;
-- delete an order, based on customer_id
DELETE FROM Orders WHERE `customer_id` = :customer_idInput;
-- delete an order, based on coin_id
DELETE FROM Orders WHERE `coin_id` = :coin_idInput;


-- ////////  Coin_wallet_junction TABLE [M:M] \\\\\\\\

-- get all current data in this table
SELECT * FROM Coin_wallet_junction;
-- insert items into this table
INSERT INTO Coin_wallet_junction (`coin_id`, `wallet_id`)
VALUES (:coin_idInput, :wallet_idInput);
-- delete items from this table
DELETE FROM Coin_wallet_junction WHERE `coin_id` = :coin_idInput AND `wallet_id` = :wallet_idInput;
-- view all Coins info of a specific coin_id, %s will be something that the use chooses to look into.
SELECT * FROM Coins
   INNER JOIN Coin_wallet_junction ON Coins.coin_id = Coin_wallet_junction.coin_id
   WHERE Coin_wallet_junction.coin_id = %s;
-- view all Wallets info of a specific wallet_id, %s will be something that the use chooses to look into.
SELECT * FROM Wallets
   INNER JOIN Coin_wallet_junction ON Wallets.wallet_id = Coin_wallet_junction.wallet_id
   WHERE Coin_wallet_junction.wallet_id = %s;