import db from '../utility/dbManager.js';
const investors=[
    {
        mobile:"1231231231",
        name:"Bob",
        email:"bob@gmail.com",
        portfolio:[
            {name:"ICICI MF",price:4000,quantity:1000},
            {name:"IRCTC stock",price:3000,quantity:3000},
            {name:"Real Estate at VIJ",price:10000,quantity:1}
            
        ],

    },
]
const liabilities=1000;

/* export  function fetchInvestors(mobile){
    const user=investors.find((investor)=>investor.mobile==mobile);
    if(user){
    return user;
    }
    else{
        return undefined;
    }
} */
function getInvestorFromDb(mobile){
    return new Promise((resolve,reject)=>{
        db.get(
        `select * from investor where investor_id='${mobile}'; `,(err,rows)=>{
            if(err) reject(err);
            else {
                console.log(`rows:${JSON.stringify(rows)}`);
            resolve (rows);
        };
        })
    })
}

export async function fetchInvestors(mobile){
    try{
        const data=await getInvestorFromDb(mobile);
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
    }
}

function getNavFromDb(mobile){
    return new Promise((resolve,reject)=>{
        db.all(
        `
        select i.first_name,p.portfolio_id,a.* 
        from investor i
        join portfolio p 
            on i.investor_id = p.investor_id 
        join asset a 
            on p.portfolio_id = a.portfolio_id
        where i.investor_id = ?;
        `,
        [mobile],(err,rows)=>{
            if(err) reject(err);
            else {
            console.log(`rows:${JSON.stringify(rows)}`);
            resolve (rows);
        };
        })
    })
}
export async function calculateTheNav(mobile){
    //const investor=fetchInvestors(mobile);
    /* const portfolio=investor.portfolio;

    const totalAssets=portfolio.reduce((total,asset)=>{
        return total+(asset.price*asset.quantity)
    },0);
    let netAssets=totalAssets-liabilities; //broker charges
    netAssets=netAssets-2000 //some charges
    
    const nav=(netAssets/totalAssets); */
    const nav=await getNavFromDb(mobile);
    console.log(nav);
    return nav;
}

function checkInvestorExistance(mobile){
    return new Promise((resolve,reject)=>{
        db.get(
            `
            select * from investor where investor_id='${mobile}';
            `,(err,rows)=>{
                if(err) reject(err)
                else{
                     console.log(rows);
                    if(rows) resolve({ exists: true, data: rows });
                    
                else{ 
                    console.log(rows);
                    resolve(false);}}
            }
        )
    })
} 
/* async function checkInvestorExistance(mobile){
    const data=await db.all(`select * from investor where investor_id=?`,[mobile], );
        console.log(data);
        return data.length>0; 
} */
export async function checkInvestorData(mobile){
    const existance=await checkInvestorExistance(mobile);
    console.log(existance);
    return existance;
}
const users=[
    {email:'hema@gmail.com',
        password:"hema",
        role:"user",
        loggedIn:false,
    }
]

export function loginUser(email,password){
    const userIndex=users.findIndex((u)=>u.email==email && u.password==password);
    if(userIndex!=-1){
        users[userIndex]={...users[userIndex],loggedIn:true};
    }
    return users[userIndex];
}
export const invalidToken=[];
/* export function logoutUser(email,token){
    const userIndex=users.findIndex((u)=>u.email==email && u.loggedIn==true);
    //console.log("User to logout ");
    if(userIndex!=-1){
        users[userIndex]={...users[userIndex],loggedIn:false};
        invalidToken.push(token);
        return true;
    }
    return false;
} */
export function logoutUser(email, token){

    const userIndex = users.findIndex(
        (u)=> u.email == email && u.loggedIn == true
    );

    if (userIndex != -1){
        users[userIndex] = {...users[userIndex], loggedIn:false};
        invalidToken.push(token);
        return true;
    }
    return false;
}


async function migrateAssets() {
    const migrateDBPromise= new Promise((resolve,reject)=>{
        db.serialize(() => {

  db.run("BEGIN TRANSACTION");

  db.run(`
    INSERT INTO portfolio(portfolio_id, investor_id)
    VALUES (301, 'INV001')
  `);

  db.run(`
    INSERT INTO asset(
      id,
      name,
      qty,
      purchase_date,
      unit_value,
      portfolio_id
    )
    VALUES (
      2001,
      'Infosys Shares',
      10,
      '2024-01-01',
      1500,
      301
    )
  `);

  // Intentional FK failure
  db.run(`
    INSERT INTO asset(
      id,
      name,
      qty,
      purchase_date,
      unit_value,
      portfolio_id
    )
    VALUES (
      2002,
      'Broken Asset',
      5,
      '2024-01-01',
      1000,
      9999
    )
  `, (err) => {

    if (err) {
      console.log("Error occurred");
      console.log(err.message);

      db.run("ROLLBACK");
    } else {
      db.run("COMMIT");
    }

  });

});
try {
    await migrateDBPromise;
    console.log("Migration completed"); 
}
catch(error){
    console.error("Error occurred during migration:", error);
}})
    
}