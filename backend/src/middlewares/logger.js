const logger = (req, res, next) => {
    console.log(new Date().toString());
    console.log("Method:", req.method);
    console.log("Path:  ", req.path);
    console.log("Body:  ", req.body);
    console.log("-----");
    next();
};

module.exports = logger;
