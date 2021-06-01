module.exports = function(){
    var express = require('express');
    var router = express.Router();

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

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteCustomer.js"];
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
            context.jsscripts = ["deleteCustomer.js"];
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

    /*Display all people whose name starts with a given string. Requires web based javascript to delete users with AJAX */
/*     router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPeopleWithNameLike(req, res, mysql, context, complete);
        getPlanets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('people', context);
            }
        }
    }); */

    /* Display one person for the specific purpose of updating people */

/*     router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedplanet.js", "updateperson.js"];
        var mysql = req.app.get('mysql');
        getPerson(res, mysql, context, req.params.id, complete);
        getPlanets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-person', context);
            }

        }
    }); */

    /* Adds a person, redirects to the people page after adding */

/*     router.post('/', function(req, res){
        console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES (?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/people');
            }
        });
    }); */

    /* The URI that update data is sent to in order to update a person */
/* 
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE bsg_people SET fname=?, lname=?, homeworld=?, age=? WHERE character_id=?";
        var inserts = [req.body.fname, req.body.lname, req.body.homeworld, req.body.age, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    }); */

    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

/*     router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM bsg_people WHERE character_id = ?";
        var inserts = [req.params.id];
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
    }) */

    return router;
}();