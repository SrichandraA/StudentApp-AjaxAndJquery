var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var mysql=require('mysql');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var name;
var sqlselect;
var sqldelete;
var sqlinsert;
var sqlupdate;
// Retrieve
var config=require('./config');
var con =mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"riktam"

});
con.connect(function(err){
  if (err) throw err;
  console.log("connected");

 //   res.render('table',{page_title:"fdfd0",data})
//var sql="insert into table1(name,section) values('hig','go')";

});

/*con.query("insert into table1(name,section,email,phone) values('hig','go','fs','66')",function(err,res){
if(err) throw err;
console.log('1rec');

});*/
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'jade');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
/* testing url*/
app.get('/first',function(req,res){

con.query("select * from table1",function(err,result){
if(err) throw err;
console.log(result);
res.writeHead(200,{'Content-Type':'text/html'})
res.write("<html><body><p>'result'</p></body></html>");


});

});
/* testing url*/

app.get('/second',function(req,res){

con.query("select * from table1",function(err,result){
if(err) throw err;
console.log(result);

res.send(result);

});

});
/*first page of project url*/
app.get('/pagination/:id',function(req,res){
con.query("select * from table1",function(err,result){
	if(err) throw err;
	var page=req.params.id;
	res.render('pagination',{students:result,currentPage:page,status:false,g:1});
});
});
/* testing url*/

app.get('/third',function(req,res){

con.query("select * from table1",function(err,result){
if(err) throw err;
console.log(result);

res.render('main',{users: result});
});

});
/* testing url*/

app.get('/page',function(req,res){
  res.sendFile('/t/testingnode/routes/page.html');
});

/* testing url*/

app.get('/test',function(req,res){
  res.render('test');
});
/*pressing edit button url*/

app.post('/editpage',urlencodedParser, function(req,res){

console.log(req.body.val);
let name={name:req.body.val};
let sql='select * from table1 where ?';
//let val=req.body.val;
con.query(sql,name,function(err,result){
if(err) throw err;
//res.send(result);
//res.render('test',{users: result});
con.query("select * from table1",function(err,result1){
	if(err) throw err;
	var page=1;
	res.render('pagination',{students:result1,currentPage:page,status:false,single:result,g:0});
});

});

});
/* testing url */
app.get('/testing1',function(req,res){
	res.render('canhtml.html');
});
app.get('/testing2',function(req,res){
		res.send("fgd");


});
app.post('/testing3',function(req,res){
	console.log('body: ' + req.body.title);
		res.send("fo");


});
/*registration button url*/
app.get('/register',function(req,res){
  res.sendFile('/t/testingnode/routes/register.html');


});
/* testing url*/

app.post('/save',urlencodedParser, function(req,res){
  console.log(req.body.name);
  let newname=req.body.name;
  let post={name:req.body.name, section:req.body.section, email:req.body.email ,phone:req.body.phone};
  let sql='insert into table1 SET ?';
  con.query(sql,post,function(err,result){
if(err) throw err;
con.query("select * from table1",function(err,result){
if(err) throw err;

res.render('main',{users: result});
});
});
});
/* save button url*/
app.post('/save1',urlencodedParser, function(req,res){

  let post={name:req.body.name};
  	let sql='select name from table1 where ?';
  	con.query(sql,post,function(err,result){
  		if(err) throw err;

  		if(result.length < 1 ){
  			 let post={name:req.body.name, section:req.body.section, email:req.body.email ,phone:req.body.phone};
  let sql='insert into table1 SET ?';
  con.query(sql,post,function(err,result){
if(err) throw err;
con.query("select * from table1",function(err,result){
	if(err) throw err;
	var page=1;
	res.render('pagination',{students:result,currentPage:page,status:false,g:1});
});
});


  		}
  		else{

  		  			con.query("select * from table1",function(err,result){
	if(err) throw err;
	var page=1;
	res.render('pagination',{students:result,currentPage:page,status:true,g:1});
});

  		}
  	});

});
/* deleting btn url*/

app.post('/dell',urlencodedParser,function(req,res){

	let post={name:req.body.val};
	let sql='DELETE from table1 where ?';
	con.query(sql,post,function(err,result){
		if(err) throw err;
	con.query("select * from table1",function(err,result){
	if(err) throw err;
	var page=1;
	res.render('pagination',{students:result,currentPage:page,status:false,g:1});
});
	});

});
/* updating url*/

app.post('/update',urlencodedParser, function(req,res){

	let post=[{section:req.body.section, email:req.body.email, phone:req.body.phone},{name:req.body.name}];
	let sql="update table1 set ? where ?";
	con.query(sql,post,function(err,result){
		if(err)throw err;
con.query("select * from table1",function(err,result){
	if(err) throw err;
	var page=1;
	res.render('pagination',{students:result,currentPage:page,status:false,g:1});
});
	});

});
/**************************************************************************************************************************/
/**************************************************************************************************************************/
/**************************************************************************************************************************/
app.get('/start',function(req,res){
	res.render('start.html');
});

app.get('/getlist',function(req,res){
  con.query("select * from table1",function(err,result){
	   if(err) throw err;
     console.log(result);
	   res.send(JSON.stringify(result));
   });
});

/*testing*/
app.post('/getlist2',function(req,res){
  res.send(req.body.title);
});

app.post('/registerstudent',function(req,res){
  name = {name:req.body.name};
  console.log(req.body.name);
  sqlselect = 'select name from table1 where ?';
  con.query(sqlselect,name,function(err,result){
    if(err) throw err;
    if(result.length < 1 ) {
      let data = {
        name: req.body.name,
        section: req.body.section,
        email: req.body.email,
        phone: req.body.phone
      };
    sqlinsert = 'insert into table1 SET ?';
    con.query(sqlinsert,data,function(err,result1){
        if(err) throw err;
        res.send('Registration successful !');
    });
    }
    else{
        res.send('User already Exists !');
    }
  });
});

app.post('/editstudent',function(req,res){
  console.log(req.body.title);
  name = {name: req.body.title};
  sqlselect = 'select * from table1 where ?';
  //let val=req.body.val;
  con.query(sqlselect,name,function(err,result){
    if(err) throw err;
    console.log(JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

app.post('/updatestudent',urlencodedParser, function(req,res){
  console.log(req.body.name);
 	let data = [
    {
      section: req.body.section,
      email: req.body.email,
      phone: req.body.phone
    },
    {name: req.body.name}
  ];
  sqlupdate = "update table1 set ? where ?";
  con.query(sqlupdate,data,function(err,result){
  	if(err)throw err;
    res.send("updated successfully !")
  });
});

app.post('/deletestudent',function(req,res){
  name = {name: req.body.title};
  sqldelete = 'DELETE from table1 where ?';
  con.query(sqldelete,name,function(err,result){
  	if(err) throw err;
    res.send("Record deleted !")
  });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
