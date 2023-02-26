const productSchema = require("../model/product")
const { objId } = require("../validation/validation")


// ====================================== create product ===============================================================

const createProduct = async (req, res) => {
    try {
        let reqData = req.body
        if (req.Designation != "admin") return res.status(400).send({ status: "failed", message: "only admin can create product" })
        for (let el of ["productName", "price"]) {
            if (!reqData[el]) return res.status(400).send({ status: "failed", message: `${el} is required` })
        }
        let createdProduct = await productSchema.create(reqData)
        res.status(201).send({ status: "success", message: "product seccessful created", product: createdProduct })
    } catch (err) {
        res.status(500).send({
            status: "failed",
            message: err.message
        })
    }
}


// ==================================================== view product ================================

const getAllProduct = async (req, res) => {
    try {
        if (req.Designation != "admin") return res.status(400).send({ status: "failed", message: "only admin can create product" })
        let allProduct = await productSchema.find({ isDeleted: false })
        res.status(200).send({ status: "success", products: allProduct })

    } catch (err) {
        res.status(500).send({ status: "failed", message: err.message })
    }
}

// ============================================== update product ======================================
const updateProduct = async (req, res) => {
    try {
        if (req.Designation != "admin") return res.status(400).send({ status: "failed", message: "only admin can create product" })
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: "failed", message: "for updation should be put data in body" })
        if (!data.productId) return res.status(400).send({ status: "failed", message: "for updation should be put product id" })

        if (!objId(data.productId)) return res.status(400).send({ status: "failed", message: "please provide valide product id" })
        let updatedProduct = await productSchema.findOneAndUpdate({ _id: data.productId, isDeleted: false }, data, { new: true })
        if (!updatedProduct) return res.status(400).send({ status: "failed", message: "product not found try again...." })
        res.status(200).send({ status: "success", message: "product is updated", product: updatedProduct })
    } catch (err) {
        res.status(500).send({ status: "failed", message: err.message })
    }
}


// ============================================ delete product ==================================
const deleteProduct = async (req, res) => {
    try {
        if (req.Designation != "admin") return res.status(400).send({ status: "failed", message: "only admin can create product" })
        let data = req.body
        if (Object.keys(data).length == 0 || !data.productId) return res.status(400).send({ status: "failed", message: "for deleation should be put productId in body" })

        if (!objId(data.productId)) return res.status(400).send({ status: "failed", message: "please provide valide product id" })
        let updatedProduct = await productSchema.findOneAndUpdate({ _id: data.productId, isDeleted: false }, { isDeleted: true }, { new: true })
        if (!updatedProduct) return res.status(400).send({ status: "failed", message: "product not found try again...." })
        res.status(200).send({ status: "success", message: "product is deleted" })
    } catch (err) {
        res.status(500).send({ status: "failed", message: err.message })
    }
}



module.exports = { createProduct, getAllProduct, updateProduct ,deleteProduct}