const { tokos } = require('../models/index');
const apiResponse = require("../helpers/apiResponse");
const haversine = require('haversine-distance')


module.exports = {


    //create
    async create(req, res) { 
 
        var photo = req.files.photo == null ? null : req.files.photo[0].filename
        let result = await tokos.create({
            name: req.body.name,
            jambuka: req.body.jambuka,
            jamtutup: req.body.jamtutup,
            latitude: req.body.latitude,
            longitude:  req.body.longitude,
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

        let result = await tokos.findAll({
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

            CoinArray.push(new Coin(result[i].id,result[i].name,result[i].photo,hasil,result[i].authId));
                
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
        return apiResponse.successResponseWithData(res, "SUCCESS", req.toko);
    },

    // Update
    async update(req, res) {
        req.toko.name = req.body.name;
        req.toko.jambuka = req.body.jambuka;
        req.toko.jamtutup = req.body.jamtutup;
        req.toko.jumlahpembelian = req.body.jumlahpembelian;
        req.toko.authId = req.body.authId;
        req.toko.latitude = req.body.latitude;
        req.toko.longitude = req.body.longitude;
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
