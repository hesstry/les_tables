module.exports = function(){
    var express = require('express');
    var router = express.Router();

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

    /*Display all people. Requires web based javascript to delete users with AJAX*/

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
        }else{
            res.redirect('/wallets');
        }
        });
    });

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