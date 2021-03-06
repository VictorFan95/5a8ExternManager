const db = require('../db/BDConnection');
const moment = require('moment');
const dateFormat = require('dateformat');
const default5a8Day = 'thursday'; // for Thursday
function findDay(dayNeeded) {
    var weekDayToFind = moment().day(dayNeeded).weekday(); 
    var searchDate = moment();
    while (searchDate.weekday() !== weekDayToFind){ 
        searchDate.add(1, 'day'); 
    }   
    return searchDate;
} 

module.exports = {
    getEvents: function(req, res) {
        var queryTxt = 'SELECT * FROM public.events'; 
        const id = req.params.id;  
        db.query(queryTxt, (err, out) => {
            if(err) res.status(400).send(err);
            else res.send(out.rows);
        });   
    },
    getExternByEvent: function(req, res){
        var queryTxt = 'SELECT externs.CIP1, u1.FIRSTNAME as f1, u1.LASTNAME as l1, \
        externs.CIP2, u2.FIRSTNAME as f2, u2.LASTNAME as l2, \
        externs.EXTERN_NAME FROM public.externs, public.users as u1, public.users \
        as u2 WHERE event_id = $1 AND externs.CIP1 = u1.CIP AND externs.CIP2 = u2.CIP'; 
        const id = req.params.id;  
        db.query(queryTxt, [id], (err, out) => {
            if(err) res.status(400).send(err);  
            else res.send(out.rows);
        });  
    },
    insertEvents: function(req, res){
        var queryTxt = 'INSERT INTO public.events(id, eventtime) VALUES ($1, $2)'; 
        var day = findDay(default5a8Day);
        var id = dateFormat(day, 'ddmmyyyy');
        db.query(queryTxt, [id, day], (err, out) => {
            if(err) res.status(400).send(err);
            else res.send(out.rows);
        }); 
    },
    insertExternByEvent: function(req, res){
        var queryTxt = 'INSERT INTO public.externs(cip1, cip2, extern_name, event_id) VALUES ($1, $2, $3, $4)'; 
        var cip1 = req.body.cip1;
        var cip2 = req.body.cip2;
        var externName = req.body.externName;
        const id = req.params.id;  
        db.query(queryTxt, [cip1, cip2, externName, id], (err, out) => {
            if(err) res.status(400).send(err);
            else res.send(out.rows);
        }); 
    }
};