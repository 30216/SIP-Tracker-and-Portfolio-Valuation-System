import redis from 'redis';

const client=redis.createClient({
    url:"redis://localhost:6379",
});
client.on("error",(error)=>{
    console.log(`Redis Error:${error}`);
})

async function main(){
    await client.connect();
    //to write data
    await client.set("name","Hema",{Ex:10});
    console.log(`Data available:${await client.get("name")}`);
}
main();
export default client;