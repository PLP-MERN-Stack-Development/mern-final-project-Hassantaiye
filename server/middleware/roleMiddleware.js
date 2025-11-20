// Check if user is logged in
export const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "You must be logged in" });
  }
  next();
};

// Authorize based on user roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "You must be logged in" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }

    next();
  };
};
