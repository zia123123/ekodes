const { kelurahans } = require('../models/index');
const { Op } = require("sequelize");
const apiResponse = require("../helpers/apiResponse");

module.exports = {


    //create
    async create(req, res) { 
        let result = await kelurahans.create({
            name: req.body.name,
            status: true,
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async find(req, res, next) {
        let kelurahan = await kelurahans.findByPk(req.params.id);
        if (!kelurahan) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.kelurahan = kelurahan;
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
        let result = await kelurahans.findAll({
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
        return apiResponse.successResponseWithData(res, "SUCCESS", req.kelurahan);
    },

    // Update
    async update(req, res) {
        req.kelurahan.name = req.body.name;
        req.kelurahan.status = req.body.status;
        req.kelurahan.save().then(kelurahan => {
        return apiResponse.successResponseWithData(res, "SUCCESS", kelurahan);
        })
    },

    // Delete
    async delete(req, res) {
        req.kelurahan.destroy().then(kelurahan => {
            res.json({ msg: "Berhasil di delete" });
        })
    },

}
