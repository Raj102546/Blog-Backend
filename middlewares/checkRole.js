function checkRole(role) {
  return (req, res, next) => {
    if (req.authData.role !== role) {
      res.status(403).json({ error: `Only ${role} can access this feature` });
    }
    next();
  };
}

module.exports = checkRole;
