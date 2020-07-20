const express =require('express');
const Hero = require ('../models/hero');   //this is like a class
const router = express.Router();


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



router.get('/', async (req,res) => {

    // let heroes=['Captian America','Iron Man','Black Widow'];   //in here, let is the new keyword for var

    // res.send(heroesArray);

    //**************************************

   //1) let heroes = await Hero.find({deceased:true,name:''});  //filtering value in here dead guys only get

   //2) let heroes = await Hero.find({deceased:true});

   //3) let heroes = await Hero.find().limit(1);  //limit how many requests you want

  //4) let heroes = await Hero.find().skip(1).limit(); //skip 1st one and limit to one

  //5) let heroes = await Hero.find().sort({name:'asc'}); //sort name ascending

  /*6)let heroes = await Hero.find({likeCount :{$nin :[3000,10000]}})
                        .sort({name:'asc'})
                        .select({name:1,deceased:1});  //to get only selected values*/
    let heroes = await Hero.find()
                        .or([{likeCount :3000},{likeCount :5000}])
                        .sort({name:'asc'})
                        .select({name:1,deceased:1});
                       // .countDocuments();
                    //res.send("Count is"+ heroes);
    
    res.send(heroes);
 })
 
 router.get('/:heroId',async (req,res) => {
 
     // let heroID = req.params.heroId;  //request parameter
 
     // let optionalValue =req.query.showMore;  //query parameter
 
     // //res.send(" You requested for hero Id: " + heroID + " and optional value :" + optionalValue ); 
 
     // res.send(" You requested for hero Id: " + heroID); 

     //***** */
 
     //let heroId = parseInt(req.params.heroId);
    // let hero=heroesArray.find(h=> h.id === heroId);

    let hero=await Hero.findById(req.params.heroId)
 
     if(!hero){
         return res.status(404).send("The given Id does not exsist in our server")
     }
     res.send(hero);
 
 
 })
 
 router.post('/',async (req,res)=>{
 
    
     if(!req.body.heroName){
         return res.status(400).send("Not all mandatory values have been set!"); //after return nothing get will executed
 
     }

     try{

        let heroToBeAddedToDb=new Hero({
            

            

            name :req.body.heroName,
            birthname :req.body.birthname,
            movies :req.body.movies,
            likeCount :req.body.likeCount,
            imageUrl :req.body.imageUrl,
            deceased:req.body.deceased
            
            
        })

        heroToBeAddedToDb=await heroToBeAddedToDb.save();

        res.send(heroToBeAddedToDb);
     }catch(e){
     
         return res.status(500).send(e.message);
     }


    //  let newHeroObj={
    //      id :heroesArray.length + 1,
    //      name :req.body.heroName
    //      //age:req.body.heroAge
    //  };
    //  heroesArray.push(newHeroObj);
    //  console.log(heroesArray);

     
 });
 
 /*
 router.put('/:heroId',async(req,res)=>{

   let hero=await Hero.findById(req.params.heroId);
 
     //let heroId = parseInt(req.params.heroId);
     //let hero=heroesArray.find(h=> h.id === heroId);
 
     if(!hero){
         return res.status(404).send("The given Id does not exsist in our server");
     }
 
 
     
     if(!req.body.heroName){
         return res.status(400).send("Not all mandatory values have been set! ");
     }
     
    //let heroes = await Hero.find()


    hero.set({name:req.body.heroName});
    hero=await hero.save();
     //hero.name =req.body.heroName;
     //console.log(heroesArray)
     res.send(hero);
 
 });
 
 */


router.put('/:heroId',async(req,res)=>{

   let hero=await Hero.findOneAndUpdate(
    

    {_id: req.params.heroId},
    {$set :{likeCount:req.body.likeCount}},
    {new:true,useFindAndModify:false}
   );
   res.send(hero);

});

 router.delete('/:heroId',async(req,res)=>{   //:use for generic parameter
 
    let hero =await Hero.findOneAndDelete({_id:req.params.heroId})
    //  let heroId = parseInt(req.params.heroId);
    //  let hero=heroesArray.find(h=> h.id === heroId);
 
     if(!hero){
         return res.status(404).send("The given Id does not exsist in our server");
     }
 
    //  let indexofHero=heroesArray.indexOf(hero);
 
    //  heroesArray.splice(indexofHero,1);
 
    //  console.log(heroesArray)
     res.send(hero);
 
 });
 
 module.exports=router;


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
 
 
 