const { products } = require('../models/index');
const apiResponse = require("../helpers/apiResponse");

module.exports = {


    //create
    async create(req, res) { 
        var photo = req.files.photo == null ? null : req.files.photo[0].filename
        let result = await products.create({
            nama: req.body.nama,
            deskripsi: req.body.deskripsi,
            harga: req.body.harga,
            tokoId: req.body.tokoId,
            status: true,
            photo: photo
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async find(req, res, next) {
        let product = await products.findByPk(req.params.id);
        if (!product) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.product = product;
            next();
        }
    },

    async index(req, res) {
        let result = await products.findAll({
            where: {
                status: true
            },
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },
    async indexByToko(req, res) {
        let result = await products.findAll({
            where: {
                tokoId: req.query.tokoId
            },
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    // Show
    async show(req, res) {
        return apiResponse.successResponseWithData(res, "SUCCESS", req.product);
    },

    // Update
    async update(req, res) {
        req.product.nama = req.body.nama;
        req.product.deskripsi = req.body.deskripsi;
        req.product.harga = req.body.harga;
        req.product.status = req.body.status;
        req.product.save().then(product => {
        return apiResponse.successResponseWithData(res, "SUCCESS", product);
        })
    },

    // Delete
    async delete(req, res) {
        req.product.status = false;
        req.product.save().then(product => {
        return apiResponse.successResponseWithData(res, "SUCCESS", product);
        })
    },

}
