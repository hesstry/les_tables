module.exports = function(){
    var express = require('express');
    var router = express.Router();


    // function to get all coins, no parameters
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

    // below functions are for each specific ordering based on the 
    // many filtering options available on this page
    function getCoinsByPriceAscending(req, res, mysql, context, complete){
        var query = "SELECT coin_id, UPPER(ticker), price, change_24hr FROM coins ORDER BY price ASC";
        console.log(req.params)
        var inserts = [req.params.homeworld]
        mysql.pool.query(query, inserts, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.coins = results;
              complete();
          });
      }

      function getCoinsByPriceDescending(req, res, mysql, context, complete){
        var query = "SELECT coin_id, ticker, price, change_24hr FROM coins ORDER BY price DESC";
        console.log(req.params)
        var inserts = [req.params.homeworld]
        mysql.pool.query(query, inserts, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.coins = results;
              complete();
          });
      }

      function getCoinsByNameAscending(req, res, mysql, context, complete){
        var query = "SELECT coin_id, ticker, price, change_24hr FROM coins ORDER BY ticker ASC";
        console.log(req.params)
        var inserts = [req.params.homeworld]
        mysql.pool.query(query, inserts, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.coins = results;
              complete();
          });
      }

      function getCoinsByNameDescending(req, res, mysql, context, complete){
        var query = "SELECT coin_id, ticker, price, change_24hr FROM coins ORDER BY ticker DESC";
        console.log(req.params)
        var inserts = [req.params.homeworld]
        mysql.pool.query(query, inserts, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.coins = results;
              complete();
          });
      }

      function getCoinsByChangeDescending(req, res, mysql, context, complete){
        var query = "SELECT coin_id, ticker, price, change_24hr FROM coins ORDER BY change_24hr DESC";
        console.log(req.params)
        var inserts = [req.params.homeworld]
        mysql.pool.query(query, inserts, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.coins = results;
              complete();
          });
      }

      function getCoinsByChangeAscending(req, res, mysql, context, complete){
        var query = "SELECT coin_id, ticker, price, change_24hr FROM coins ORDER BY change_24hr ASC";
        console.log(req.params)
        var inserts = [req.params.homeworld]
        mysql.pool.query(query, inserts, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.coins = results;
              complete();
          });
      }

    // router for displaying the table
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filtercoins.js"];
        var mysql = req.app.get('mysql');
        getCoins(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                console.log(context);
                res.render('coins', context);
            }
        }
    });

    // made routers for each specific filtering to indicate what filtering the user is using
    router.get('/plotohi', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filtercoins.js"];
        var mysql = req.app.get('mysql');
        getCoinsByPriceAscending(req,res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('coins', context);
            }

        }
    });

    router.get('/phitolo', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filtercoins.js"];
        var mysql = req.app.get('mysql');
        getCoinsByPriceDescending(req,res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('coins', context);
            }

        }
    });

    router.get('/atoz', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filtercoins.js"];
        var mysql = req.app.get('mysql');
        getCoinsByNameAscending(req,res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('coins', context);
            }

        }
    });

    router.get('/ztoa', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filtercoins.js"];
        var mysql = req.app.get('mysql');
        getCoinsByNameDescending(req,res, mysql, context, complete);
        console.log(context);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('coins', context);
            }
        }
    });

    router.get('/chitolo', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filtercoins.js"];
        var mysql = req.app.get('mysql');
        getCoinsByChangeDescending(req,res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('coins', context);
            }

        }
    });

    router.get('/clotohi', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filtercoins.js"];
        var mysql = req.app.get('mysql');
        getCoinsByChangeAscending(req,res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('coins', context);
            }

        }
    });

    // router for inserting coins via a post request
    router.post('/', function(req, res){
        console.log(req.body.ticker)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO coins (ticker, price, change_24hr) VALUES (?,?,?)";

        // render page with info saying please put in all data
        var inserts = [req.body.ticker, req.body.price, req.body.change_24hr];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        console.log("INSERT RESULTS: ", results);
        if(req.body.ticker == " " || req.body.ticker == "" || error){
            // render page with error notification
            console.log(JSON.stringify(error))
            // res.write(JSON.stringify(error));
            var callbackCount = 0;
            var context = {};
            context.error = "Error: Sorry please make sure ticker is filled and does not already exist."
            context.jsscripts = ["filtercoins.js"];
            var mysql = req.app.get('mysql');
            getCoinsByChangeAscending(req,res, mysql, context, complete);
            function complete(){
                callbackCount++;
                if(callbackCount >= 1){
                    res.render('coins', context);
                }
            }
        }else{
            res.redirect('/coins');
        }
        });
    });
    return router;
}();
