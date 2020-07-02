emailjob=(req,res,next)=>{                   //middleware
        console.log('Sending mail to user');
         next();
   }
   module.exports=emailjob;