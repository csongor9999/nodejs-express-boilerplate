function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role === role) {
            next();
        } else {
            res.status(401).json({ message: "You don't have the right to be here" });
        }
    }
}

module.exports = { authorizeRole };