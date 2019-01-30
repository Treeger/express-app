const cookieHandler = (req, res, next) => {
    req.parsedCookies = req.cookies;
    next();
};

export default cookieHandler;