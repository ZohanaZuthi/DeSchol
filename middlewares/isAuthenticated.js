import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => { 
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    req.id = decodedToken.userId;
    
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export { isAuthenticated };
