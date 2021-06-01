module.exports = function(){
    var express = require('express');
    var router = express.Router();

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

    function getCoinsByPriceAscending(req, res, mysql, context, complete){
        var query = "SELECT coin_id, ticker, price, change_24hr FROM coins ORDER BY price ASC";
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

    /*Display all people. Requires web based javascript to delete users with AJAX*/

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

    /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
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
            // res.end();
        }else{
            res.redirect('/coins');
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
