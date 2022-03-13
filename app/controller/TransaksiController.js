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
            status: true,
            typebayar: req.body.typebayar,
            keranjang: req.body.keranjang,
            idtransaksi: req.body.idtransaksi,
            typetransaksi: req.body.typetransaksi,
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
        let transaksi = await transaksi.findByPk(req.params.id);
        if (!transaksi) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.transaksi = transaksi;
            next();
        }
    },

    async index(req, res) {
        let result = await transaksi.findAll({
            where: {
                status: true
            },
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    async indexMyOrder(req, res) {
        let result = await transaksi.findAll({
            where: {
           
                            status:  true,
                            idpenjual:  req.query.idpenjual
            }
                     
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    // Show
    async show(req, res) {
        return apiResponse.successResponseWithData(res, "SUCCESS", req.transaksi);
    },

    // Update
    async update(req, res) {
        req.transaksi.status = req.body.status;
        req.transaksi.save().then(transaksi => {
        return apiResponse.successResponseWithData(res, "SUCCESS", transaksi);
        })
    },

    // Delete
    async delete(req, res) {
        req.toko.status = false;
        req.toko.save().then(toko => {
        return apiResponse.successResponseWithData(res, "SUCCESS", toko);
        })
    },

}
