import jwt from "jsonwebtoken"
// export const protect=(req,res,next)=>{
//     const token=req.cookies.token;

    
//     if(!token){
//         return res.status(401).json({message:"Not Authorized",success:false})
//     }
//     try {
//         const decoded=jwt.verify(token,process.env.JWT_SECRET);
//         req.user=decoded;
//         next();
//     } catch (error) {
//         res.status(401).json({message:"Invalid token"});
//     }
// }
export const protect = (req, res, next) => {
    const token = req.cookies.token;

    console.log("Cookies:", req.cookies);   // 👈 add
    console.log("Token:", token);           // 👈 add

    if (!token) {
        return res.status(401).json({ message: "Not Authorized", success: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        console.log("Decoded:", decoded);   // 👈 add

        next();
    } catch (error) {
        console.log("JWT Error:", error.message); // 👈 add
        res.status(401).json({ message: "Invalid token" });
    }
};

// adminmiddaleware
export const adminOnly=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Not Authorized",success:false})
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.admin=decoded;
        if(req.admin.email===process.env.ADMIN_EMAIL){
            next();
        }
        
    } catch (error) {
        res.status(401).json({message:"Invalid token"});
        
    }

}