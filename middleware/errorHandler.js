const constants = require("../constants")

const errorHandler = (err, req, res, nxt) => {
const statusCode = res.statusCode ? res.statusCode : 500;
if(statusCode == constants.NOT_FOUND) {
res.json({title: "not found",message: err.message, stackTrace: err.stack})
}
else if(statusCode == constants.VALIDATION_ERROR){
res.json({title: "validation failed",message: err.message, stackTrace: err.stack})
}
else if(statusCode == constants.FORBIDDEN){
res.json({title: "FORBIDDEN",message: err.message, stackTrace: err.stack})
}
else if(statusCode == constants.UNAUTHORIZED){
res.json({title: "UNAUTHORIZED",message: err.message, stackTrace: err.stack})
}
else if(statusCode == constants.SERVER_ERROR){
    res.json({title: "SERVER_ERROR",message: err.message, stackTrace: err.stack})
    }

    else {
        console.log('no error all good')
        console.log(err.message)
    }


}


module.exports = errorHandler;