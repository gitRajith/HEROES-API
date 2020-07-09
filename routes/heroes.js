const express =require('express');
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



router.get('/',(req,res) => {

    // let heroes=['Captian America','Iron Man','Black Widow'];   //in here, let is the new keyword for var
     res.send(heroesArray);
 })
 
 router.get('/:heroId',(req,res) => {
 
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
 
 router.post('/',(req,res)=>{
 
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
 
 router.put('/:heroId',(req,res)=>{
 
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
 
 
 router.delete('/:heroId',(req,res)=>{   //:use for generic parameter
 
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
 
 
 