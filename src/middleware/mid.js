
const jwt = require("jsonwebtoken")




// ====================================== authantication ================================

let authantication = async (req, res, next) => {
try {
    let token = req.headers.token
    jwt.verify(token, 'ashishTripathi', (reject, result) => {
        if (reject) return res.status(400).send({ status: "failed", message: reject.message })
        if (result) {
            req.name=result.name
            req.Designation=result.Designation
            next()
        }
    }
    )
    
} catch (err) {
    res.status(500).send({status:"failed",message:err.message})
    
}

}


module.exports = { authantication }