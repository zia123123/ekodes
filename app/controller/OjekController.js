const { ojeks } = require('../models/index');
const { Op } = require("sequelize");

const haversine = require('haversine-distance')
const apiResponse = require("../helpers/apiResponse");

module.exports = {


    //create
    async create(req, res) { 
        var photo = req.files.photo == null ? null : req.files.photo[0].filename
        let result = await ojeks.create({
            photo: photo,
            nama: req.body.nama,
            latitude: req.body.latitude,
            longitude:  req.body.longitude,
            platnomor: req.body.platnomor,
            namamotor: req.body.namamotor,
            kecamatanId: req.body.kecamatanId,
            kelurahanId: req.body.kelurahanId,
            authId: req.body.authId,
            status: true,
        }).then(result => {
            return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
        }).catch(function (err)  {
            return apiResponse.ErrorResponse(res, err);
        });
      },

    async find(req, res, next) {
        let ojek = await ojeks.findByPk(req.params.id);
        if (!ojek) {
        return apiResponse.notFoundResponse(res, "Not Fond");
        } else {
            req.ojek = ojek;
            next();
        }
    },


    async index(req, res) {

        class Coin {
            constructor(id,nama,photo,jarak,authId) {
              this.id = id;
              this.nama = nama;
              this.photo = photo;
              this.jarak = jarak+" KM";
              this.authId = authId;
            }
          }
        
        var   CoinArray = [];

        let result = await ojeks.findAll({
            where: {
                status: true
            },
        }).then(result => {
            for(var i=0;i<result.length;i++){
        const a = {
             latitude: req.query.latitude ,
             longitude: req.query.longitude }

        const b = { 
                   latitude: result[i].latitude,
                   longitude: result[i].longitude
                 }
        var nilai = (haversine(a, b)/1000)
        if(nilai <1 ){
            var hasil = 1
        }else{
            var hasil = Math.round(nilai)
        }

            CoinArray.push(new Coin(result[i].id,result[i].nama,result[i].photo,hasil,result[i].authId));
                
            }
           
            CoinArray.sort((a,b) => (a.jarak > b.jarak) ? 1 : ((b.jarak > a.jarak) ? -1 : 0))
            //console.log(result) 
            return apiResponse.successResponseWithData(res, "SUCCESS", CoinArray);
            }).catch(function (err){
                return apiResponse.ErrorResponse(res, err);
            });
    },

    // Show
    async show(req, res) {
        return apiResponse.successResponseWithData(res, "SUCCESS", req.ojek);
    },

    // Update
    async update(req, res) {
        req.ojek.latitude = req.body.latitude;
        req.ojek.longitude = req.body.longitude;
        req.ojek.status = req.body.status;
        req.ojek.save().then(ojek => {
        return apiResponse.successResponseWithData(res, "SUCCESS", ojek);
        })
    },

    // Delete
    async delete(req, res) {
        req.ojek.destroy().then(ojek => {
            res.json({ msg: "Berhasil di delete" });
        })
    },

}
