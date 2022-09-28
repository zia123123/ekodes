const { transaksi } = require('../models/index');
const apiResponse = require("../helpers/apiResponse");
const Distance = require('geo-distance');

module.exports = {


    //create
    async create(req, res) { 
        let result = await transaksi.create({
            nama: req.body.nama,
            notelp: req.body.notelp,
            koordinat: req.body.koordinat,
            status: 1,
            typebayar: req.body.typebayar,
            keranjang: req.body.keranjang,
            idtransaksi: req.body.idtransaksi,
            typetransaksi: req.body.typetransaksi,
            tujuan: req.body.tujuan,
            idpenjual: req.body.idpenjual,
            idpembeli: req.body.idpembeli,
            ongkir: req.body.ongkir,
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async find(req, res, next) {
        let result = await transaksi.findByPk(req.params.id);
        if (!result) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.result = result;
            next();
        }
    },

    async index(req, res) {
        let result = await transaksi.findAll({
          
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    async indexMyOrder(req, res) {
        let result = await transaksi.findAll({
            where: {
                    idpenjual:  req.query.idpenjual
            }
                     
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    async indexMyOrderPembeli(req, res) {
        let result = await transaksi.findAll({
            where: {
                    idpembeli:  req.query.idpembeli
            }
                     
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    
    // Show
    async show(req, res) {
        return apiResponse.successResponseWithData(res, "SUCCESS", req.result);
    },

    // Update
    async update(req, res) {
        req.result.status = req.body.status;
        req.result.save().then(result => {
        return apiResponse.successResponseWithData(res, "SUCCESS", result);
        })
    },

    // Delete
    async delete(req, res) {
        req.result.status = false;
        req.result.ongkir =  req.body.ongkir;
        req.result.save().then(result => {
        return apiResponse.successResponseWithData(res, "SUCCESS", result);
        })
    },

}
