import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = async(password: string)=>{
    try{
        const hashedPassword  = await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    }catch(e){
        console.log(e);

    }

}
export const comparePassword = async(password: string,hash: string)=>{
    try{
        const match = await bcrypt.compare(password,hash);
        return match;
    }catch(err){
        console.log(err);
    }
}