module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // function for querying all customers
    function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM customers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers  = results;
            complete();
        });
    }

    // function for querying all coins
    function getCoins(res, mysql, context, complete){
        mysql.pool.query("SELECT coin_id, ticker, price, change_24hr FROM coins", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.coins  = results;
            complete();
        });
    }

    // function for querying all  wallets
    function getWallets(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM wallets", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.wallets  = results;
            complete();
        });
    }

    // function for querying all orders
    function getOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM orders", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orders  = results;
            complete();
        });
    }

    // router for getting all orders and displaying table 
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["filtercoins.js"];
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        getWallets(res, mysql, context, complete);
        getCoins(res, mysql, context, complete);
        getOrders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                console.log(context);
                res.render('orders', context);
            }
        }
    });

    // router for inserting a new order via post request
    router.post('/', function(req, res){
        console.log(req.body.ticker)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO orders (wallet_id, customer_id, type, coin_id, amount, completed, time) VALUES (?,?,?,?,?,?,?)";

        // render page with info saying please put in all data
        var inserts = [req.body.wallet_id, req.body.customer_id, req.body.type, req.body.coin_id, req.body.amount, req.body.completed, req.body.time];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        console.log("INSERT RESULTS: ", results);
        if(error){
            console.log(JSON.stringify(error))
            var callbackCount = 0;
            var context = {};
            context.error = "Error";
            //context.jsscripts = ["filtercoins.js"];
            var mysql = req.app.get('mysql');
            getCustomers(res, mysql, context, complete);
            getWallets(res, mysql, context, complete);
            getCoins(res, mysql, context, complete);
            getOrders(res, mysql, context, complete);
            function complete(){
                callbackCount++;
                if(callbackCount >= 4){
                    console.log(context);
                    res.render('orders', context);
                }
            }
        }else{
            res.redirect('/orders');
        }
        });
    });

    return router;
}();