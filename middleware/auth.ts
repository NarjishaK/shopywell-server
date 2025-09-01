import jwt ,{ JwtPayload } from "jsonwebtoken";

// Middleware to verify JWT token
export const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        console.log("No token found");
        return res.sendStatus(401); 
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) {
            console.log("Token verification failed");
            return res.sendStatus(403); 
        }
        req.user = user as JwtPayload;
        next();
    });
};

// Middleware to check if user has admin role
export const authorizeAdmin = (req: any, res: any, next: any) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        console.log("User is not admin");
        res.sendStatus(403); 
    }
};  
