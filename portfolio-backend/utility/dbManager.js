import sqlite3 from 'sqlite3';
//const dbPath = "C:/Users/Dell/Documents/WebileApps/Traning may4/Database/portfolio_database";
const db=new sqlite3.Database("C:/Users/india/Desktop/webileapps/training/Database/portfolio",(error)=>{
    if(error){
    console.log("Error connecting to DB");
}
else{
    console.log("Db connected successfully"); 
    }
});
export default db;
