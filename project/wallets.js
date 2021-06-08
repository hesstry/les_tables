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

    // function for querying all wallets
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

    // function for querying specified wallet
    function getWallet(res, mysql, context, wallet_id, complete){
        var inserts = [wallet_id];
        mysql.pool.query("SELECT * FROM wallets WHERE wallet_id = ?", inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.wallet = results[0];
            complete();
        });
    }

    // router for displaying all wallets via get request
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["filtercoins.js"];
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        getWallets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                console.log(context);
                res.render('wallets', context);
            }
        }
    });

    // router for displaying page to update a specific wallet
    router.get('/:wallet_id/', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateWallet.js"];
        console.log("GET REQUEST UPDATE PARAMS: ", req.params);
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        getWallet(res, mysql, context, req.params.wallet_id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('updateWallet', context);
            }

        }
    });

    // router for inserting a wallet via post request
    router.post('/', function(req, res){
        console.log(req.body.ticker)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO wallets (customer_id, balance) VALUES (?,?)";

        // render page with info saying please put in all data
        var inserts = [req.body.customer_id, req.body.balance];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        console.log("INSERT RESULTS: ", results);
        if(error){
            console.log(JSON.stringify(error))
            var callbackCount = 0;
            var context = {};
            context.error = "Error";
            var mysql = req.app.get('mysql');
            getCustomers(res, mysql, context, complete);
            getWallets(res, mysql, context, complete);
            function complete(){
                callbackCount++;
                if(callbackCount >= 2){
                    console.log(context);
                    res.render('wallets', context);
                }
            }
        }else{
            res.redirect('/wallets');
        }
        });
    });

    // router for put request to update a given wallet
    router.put('/:wallet_id/', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log("REQUEST PARAMS: ", req.params);
        console.log(req.params.wallet_id);
        console.log("CURRENT CUSTOMER ID: ", req.params.customer_id);
        var sql = "UPDATE wallets SET customer_id=?, balance=? WHERE wallet_id=?";
        var inserts = [req.body.customer_id, req.body.balance, req.params.wallet_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                console.log("ERROR IN PUT REQUEST");
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });
    return router;
}();