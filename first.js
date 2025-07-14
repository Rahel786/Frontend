function datast(dataId){
    return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        
        console.log(dataId);
        resolve("success");
    },4000);
    });
};

(async function(){
    await datast(1);
    await datast(2);

})()
