const express =require('express');
const app = express();
const PORT=5000;

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

//****************************** 20-06-29 lec continues...

app.use(express.json()); //enable json  values from the request

let heroesArray = [{
    
    id:1,
    name:'Captian America'

},{
    id:2,
    name:'Iron Man'
},{
    id:3,
    name:'Black Widow'
}];

app.get('/',(req,res) => {

    
    res.send("Avenger Assemble");
})

app.get('/api/heroes',(req,res) => {

   // let heroes=['Captian America','Iron Man','Black Widow'];   //in here, let is the new keyword for var
    res.send(heroesArray);
})

app.get('/api/heroes/:heroId',(req,res) => {

    // let heroID = req.params.heroId;  //request parameter

    // let optionalValue =req.query.showMore;  //query parameter

    // //res.send(" You requested for hero Id: " + heroID + " and optional value :" + optionalValue ); 

    // res.send(" You requested for hero Id: " + heroID); 

    let heroId = parseInt(req.params.heroId);
    let hero=heroesArray.find(h=> h.id === heroId);

    if(!hero){
        return res.status(404).send("The given Id does not exsist in our server")
    }
    res.send(hero);


})

app.post('/api/heroes',(req,res)=>{

    if(!req.body.heroName){
        return res.status(400).send("Not all mandatory values have been set!"); //after return nothing get will executed

    }

    let newHeroObj={
        id :heroesArray.length + 1,
        name :req.body.heroName
        //age:req.body.heroAge
    };
    heroesArray.push(newHeroObj);
    console.log(heroesArray);
    res.send(newHeroObj);
});

app.put('/api/heroes/:heroId',(req,res)=>{

    let heroId = parseInt(req.params.heroId);
    let hero=heroesArray.find(h=> h.id === heroId);

    if(!hero){
        return res.status(404).send("The given Id does not exsist in our server");
    }


    
    if(!req.body.heroName){
        return res.status(400).send("Not all mandatory values have been set! ");
    }
    
    hero.name =req.body.heroName;
    console.log(heroesArray)
    res.send(hero);

});


app.delete('/api/heroes/:heroId',(req,res)=>{   //:use for generic parameter

    let heroId = parseInt(req.params.heroId);
    let hero=heroesArray.find(h=> h.id === heroId);

    if(!hero){
        return res.status(404).send("The given Id does not exsist in our server");
    }

    let indexofHero=heroesArray.indexOf(hero);

    heroesArray.splice(indexofHero,1);

    console.log(heroesArray)
    res.send(hero);

});


/*

Delete method

    -find hero with heroid to delete
    -using splice delete it


*/

// app.get('/api/heroes/2',(req,res) => {

//     let hero={id: 2, name:'Iron Man'};
//     res.send(hero);
// })

// app.get('/api/heroes/3',(req,res) => {

//     let hero={id: 3, name:'Black Widow'};
//     res.send(hero);
// })


app.listen(PORT,function(){
    console.log("Listening on port:"+PORT);
});

//text


