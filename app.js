const mongoose=require('mongoose');
const express =require('express');
const { request } = require('express');
const app = express();
const PORT=5000;

//****************************** 20-06-29 lec continues...

const heroes =require('./routes/heroes');
const home =require('./routes/home');

app.use(express.json()); //enable json  values from the request

const authenticators =require('./middlewares/authenticators');

const mailer =require('./middlewares/emailjob');


app.use(authenticators);

app.use(mailer);

app.use('/api/heroes',heroes);

app.use('/',home);

mongoose
    .connect("mongodb://localhost/herodb",{useNewUrlParser:true,useUnifiedTopology: true})
    .then(() => console.log("Connected to DB sucessfully..."))
    .catch(err => console.log("Error has occured while connecting to db : ", err));


// app.use((req,res,next)=>{                   //middleware
//     console.log('Authenticating user');
//     next();
// });

// app.use((req,res,next)=>{                   //middleware
//     console.log('Logging user details');
//     next();
// });





app.listen(PORT,function(){
    console.log("Listening on port:"+PORT);
});






/*

function functionName(param1,param2){
    //code

}

functionName =(param1,param2) =>{       //Arrow function same as above but new one
    //code
}




// app.get("/",function(req,res){

//     res.send("HelloWorld!");
// });

app.get("/",(req,res)=>{

    res.send("HelloWorld!");
});




// app.get("/dogs",function(req,res){  //routs or endpoints
//     var dogArray=['Dog1','Dog 2'];
//     res.send(dogArray);
// });

app.get("/dogs",(req,res)=>{  //routs or endpoints
    var dogArray=['Dog1','Dog 2'];
    res.send(dogArray);
});

// app.get("/cats",function(req,res){  //routs or endpoints

//     var cat={name:'Persian Cat',type:'Furry'};
//     res.send(cat);
// });

app.get("/cats",(req,res)=>{  //routs or endpoints

    var cat={name:'Persian Cat',type:'Furry'};
    res.send(cat);
});

*/

