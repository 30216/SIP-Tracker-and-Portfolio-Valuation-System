import jwt from 'jsonwebtoken';

const secret="edchbelwvhidbhieyfrwiugvfbyvrwiuhFSclzknq"

export function signJwt(payload){
    try{
        const token=jwt.sign(payload,secret,{expiresIn:'10m'});
        return token;
    }catch(err){
        console.log(err);
    }
}
export function verifyJwt(token){
    /*  const payload=jwt.verify(cleanToken,secret);
    try{
        return payload; */
    try{

       // console.log(token);
        const payload=jwt.verify(token,secret);
        return payload;
    }catch(err){
        console.log(err);
        return null;
    }
}