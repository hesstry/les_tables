module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // function to retrieve all customer, no parameters given
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

    // router for get request to load table from database
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteFunctions.js"];
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                console.log(context);
                res.render('customers', context);
            }
        }
    });

    // router for inserting customers via post request
    router.post('/', function(req, res){
        console.log(req.body.ticker)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO customers (email, password, phone_number, trading_password) VALUES (?,?,?,?)";

        // render page with info saying please put in all data
        var inserts = [req.body.email, req.body.password, req.body.phone_number, req.body.trading_password];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        console.log("INSERT RESULTS: ", results);
        if(error){
            console.log(JSON.stringify(error))
            var callbackCount = 0;
            var context = {};
            context.errorr = "Error";
            context.jsscripts = ["deleteFunctions.js"];
            var mysql = req.app.get('mysql');
            getCustomers(res, mysql, context, complete);
            function complete(){
                callbackCount++;
                if(callbackCount >= 1){
                    console.log(context);
                    res.render('customers', context);
                }
            }
        }else{
            res.redirect('/customers');
        }
        });
    });

    // router for deleting a customer via delete request
    router.delete('/:customer_id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM customers WHERE customer_id = ?";
        var inserts = [req.params.customer_id];
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