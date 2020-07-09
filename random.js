
console.log("1 :Before calling Db ...");  //Synchronous code

function getMovieDataFromDb(){   //Aynchronous operation

    return new Promise((resolve ,reject)=>{

        setTimeout(()=>{
            console.log("2 :Reading movie data from our db...")
            let dbData={id: 30, name:'Avenger :End Game' };
            resolve (dbData.name);
    
        },4000);

    });
    
}

async function printMovieDetails(){
let movieDataFromDB = await getMovieDataFromDb();
let secondFunctionRes = await getActorDetailsFromImDB(movieDataFromDB);
console.log("3 :Movie Data :"+movieDataFromDB);
}

printMovieDetails();
/*
//Using resolved promise

getMovieDataFromDb().then((result) =>{
    let movieDataFromDB =result;

    console.log("3 :Movie Data :"+movieDataFromDB);
}).then((rr)=>{
    getActorDetailsFromImDB()
}).then((rr)=>{
    
}
  //creating a variable is a synchronous behaviour and getMovieDataFromDb is Aynchronous

*/

console.log("4 :Doing some other work now ...");



