const express = require('express')
const app = express()
const Service = require("./Service")
const StockModel = require("../models/StockModel")

app.post("/stock/save", Service.isLogin, async (req, res) => {
    try {
        let payload = {
            qty: req.body.qty,
            productId: req.body.productId,
            userId: Service.getMemberId(req)
        }

        await StockModel.create(payload)
        res.send({ message: "success" })
    } catch (e) {
        res.statusCode = 500
        res.send({ message: e.message })
    }
})

app.get("/stock/list", Service.isLogin, async (req, res) => {
    try {
        const ProductModal = require("../models/ProductModel")
        StockModel.belongsTo(ProductModal)

        const results = await StockModel.findAll({
            where: {
                userId: Service.getMemberId(req)
            },
            order: [['id', "DESC"]],
            include: {
                model: ProductModal
            }
        })

        res.send({ message: "success", results: results })
    } catch (e) {
        res.statusCode = 500
        res.send({ message: e.message })
    }
})

app.delete("/stock/delete/:id", Service.isLogin, async (req, res) => {
    try {
        await StockModel.destroy({
            where: {
                userId: Service.getMemberId(req),
                id: req.params.id
            }
        })

        res.send({ message: "success" })
    } catch (e) {
        res.statusCode = 500
        res.send({ message: e.message })
    }
})

app.get("/stock/report", Service.isLogin, async (req, res) => {
    try {
        const ProductModal = require("../models/ProductModel");
        const BillSaleDetailModal = require("../models/BillSaleDetailModel")

        ProductModal.hasMany(StockModel)
        ProductModal.hasMany(BillSaleDetailModal)
        
        StockModel.belongsTo(ProductModal)
        BillSaleDetailModal.belongsTo(ProductModal)

        let arr = []

        const results = await ProductModal.findAll({
            include: [
                {
                    model: StockModel,
                    include: {
                        model: ProductModal
                    }
                },
                {
                    model: BillSaleDetailModal,
                    include: {
                        model: ProductModal
                    }
                }
            ],
            where: {
                userId: Service.getMemberId(req)
            }
        })

        for (let i = 0; i < results.length; i++) {
            const result = results[i]
            const stocks = result.stocks
            const billSaleDetails = result.billSaleDetails

            let stockIn = 0
            let stockOut = 0

            for (let j = 0; j < stocks.length; j++) {
                const item = stocks[j]
                stockIn += parseInt(item.qty)
            }

            for (let j = 0; j < billSaleDetails.length; j++) {
                const item = billSaleDetails[j]
                stockOut += parseInt(item.qty)
            }

            arr.push({
                result: result,
                stockIn: stockIn,
                stockOut: stockOut
            })
        }

        res.send({ message: "success", results: arr })
    } catch (e) {
        res.statusCode = 500
        res.send({ message: e.message })
    }
})

module.exports = app
