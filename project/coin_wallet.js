module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // query to get all wallets, no parameters given
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

    // query to get all coins, no parameters given
    function getCoins(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM coins", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.coins  = results;
            complete();
        });
    }

    // query to get all coin wallet pairs, no parameters given
    function getCoinWallet(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM coin_wallet_junction", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.coin_wallet  = results;
            complete();
        });
    }

    // router for displaying page, get request
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js"];
        var mysql = req.app.get('mysql');
        getCoins(res, mysql, context, complete);
        getWallets(res, mysql, context, complete);
        getCoinWallet(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                console.log(context);
                res.render('coin_wallet_junction', context);
            }
        }
    });

    // router for inserting new coin wallet pair
    router.post('/', function(req, res){
        console.log(req.body.ticker)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO coin_wallet_junction (coin_id, wallet_id) VALUES (?,?)";

        // render page with info saying please put in all data
        var inserts = [req.body.coin_id, req.body.wallet_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        console.log("INSERT RESULTS: ", results);
        // error handling
        if(error){
            console.log(JSON.stringify(error))
            var callbackCount = 0;
            var context = {};
            context.error = "Error: No duplicates"
            context.jsscripts = ["deleteFunctions.js"];
            var mysql = req.app.get('mysql');
            getCoins(res, mysql, context, complete);
            getWallets(res, mysql, context, complete);
            getCoinWallet(res, mysql, context, complete);
            function complete(){
                callbackCount++;
                if(callbackCount >= 3){
                    console.log(context);
                    res.render('coin_wallet_junction', context);
                }
        }
        }else{
            res.redirect('/coin_wallet');
        }
        });
    });

    // router to delete a coin wallet pair
    router.delete('/:coin_id/:wallet_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM coin_wallet_junction WHERE coin_id = ? AND wallet_id = ?";
        var inserts = [req.params.coin_id, req.params.wallet_id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })
    return router;
}();