const { kecamatans } = require('../models/index');
const { Op } = require("sequelize");
const apiResponse = require("../helpers/apiResponse");

module.exports = {


    //create
    async create(req, res) { 
        var photo = req.files.photo == null ? null : req.files.photo[0].filename
        let result = await kecamatans.create({
            name: req.body.name,
            status: true,
            photo: photo
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async find(req, res, next) {
        let kecamatan = await kecamatans.findByPk(req.params.id);
        if (!kecamatan) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.kecamatan = kecamatan;
            next();
        }
    },


    // async findRt(req, res, next) {
    //     let vote = await votes.findAll({
    //         where: {
    //             [Op.or]: [
    //                 {rt: req.params.rt},
    //                 {rw: true}
    //             ]
    //         },
    //     });
    //     if (!vote) {
    //     return apiResponse.notFoundResponse(res, "Not Fond");
    //     } else {
    //         req.vote = vote;
    //         next();
    //     }
    // },


    async index(req, res) {
        let result = await kecamatans.findAll({
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
        return apiResponse.successResponseWithData(res, "SUCCESS", req.kecamatan);
    },

    // Update
    async update(req, res) {
        req.kecamatan.name = req.body.name;
        req.kecamatan.status = req.body.status;
        req.kecamatan.save().then(kecamatan => {
        return apiResponse.successResponseWithData(res, "SUCCESS", kecamatan);
        })
    },

    // Delete
    async delete(req, res) {
        req.kecamatan.destroy().then(kecamatan => {
            res.json({ msg: "Berhasil di delete" });
        })
    },

}
