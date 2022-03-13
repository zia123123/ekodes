const { tokos } = require('../models/index');
const apiResponse = require("../helpers/apiResponse");

module.exports = {


    //create
    async create(req, res) { 
 
        var photo = req.files.photo == null ? null : req.files.photo[0].filename
        let result = await tokos.create({
            name: req.body.name,
            jambuka: req.body.jambuka,
            jamtutup: req.body.jamtutup,
            jumlahpembelian: req.body.jumlahpembelian,
            kecamatanId: req.body.kecamatanId,
            kelurahanId: req.body.kelurahanId,
            authId: req.body.authId,
            status: true,
            photo: photo
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async find(req, res, next) {
        let toko = await tokos.findByPk(req.params.id);
        if (!toko) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.toko = toko;
            next();
        }
    },

    async index(req, res) {
        let result = await tokos.findAll({
            where: {
                status: true
            },
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS", result);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    // Show
    async show(req, res) {
        return apiResponse.successResponseWithData(res, "SUCCESS", req.toko);
    },

    // Update
    async update(req, res) {
        req.toko.name = req.body.name;
        req.toko.jambuka = req.body.jambuka;
        req.toko.jamtutup = req.body.jamtutup;
        req.toko.jumlahpembelian = req.body.jumlahpembelian;
        req.toko.authId = req.body.authId;
        req.toko.status = req.body.status;
        req.toko.save().then(toko => {
        return apiResponse.successResponseWithData(res, "SUCCESS UPDATE", toko);
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
