const { auths,kecamatans,kelurahans } = require('../models/index');
const bcrypt = require('bcryptjs');
const haversine = require('haversine-distance')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth');
const Distance = require("geo-distance");

const apiResponse = require("../helpers/apiResponse");
const kelurahan = require('../models/kelurahan');

module.exports = {




async signupUser(req, res) { 

    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds))
    let result = await auths.create({
        name: req.body.name,
        password: password,
        notelp : req.body.notelp,
        token: req.body.token,
        roleid: 1,
        status: true,
        kecamatanId : req.body.kecamatanId,
        kelurahanId : req.body.kelurahanId
    }).then(result => {
        return apiResponse.successResponseWithData(res, "SUCCESS CREATE", result);
    }).catch(function (err)  {
        return apiResponse.ErrorResponse(res, err);
    });
  },

//login
signInUser(req, res) {
    let { notelp, password } = req.body;
             auths.findOne({
            where: {
                notelp: notelp  
            },
            include: [ 
                { model: kecamatans,
                    attributes: ['name'],
                },
                { model: kelurahans,
                    attributes: ['name'],
                }
            ]
        }).then(auth => {
            if (!auth) {
                res.status(404).json({ message: "Password Salah" });
            } else {
                if (bcrypt.compareSync(password, auth.password)) {
                    let token = jwt.sign({ auth: auth }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                     
                    res.json({
                        status: 200,
                        message:"SUCCESS",
                        data: auth,
                        token: token
                    })
                } else {
                    // Unauthorized Access
                    res.status(401).json({ msg: "Password Salah" })
                }
            }
        }
        ).catch(err => {
            res.status(500).json(err);
        })   
    },

    

 //FIND
 async find(req, res, next) {
    let auth = await auths.findByPk(req.params.id);
    if (!auth) {
    return apiResponse.notFoundResponse(res, "Not Fond");
    } else {
        req.auth = auth;
        next();
    }
},



//INDEX  
async index(req, res) {
 
    let result = await auths.findAll().then(result => {
        return apiResponse.successResponseWithData(res, "SUCCESS", result);
        }).catch(function (err){
            return apiResponse.ErrorResponse(res, err);
        });
},
//all validate
 // Show
 async show(req, res) {
    return apiResponse.successResponseWithData(res, "SUCCESS", req.auth);
},

async update(req, res) {
    let password = bcrypt.hashSync("password123", Number.parseInt(authConfig.rounds))
    req.auth.password = password;
    req.auth.save().then(auth => {
    return apiResponse.successResponseWithData(res, "Berhasil", auth);
    })
},


    async delete(req, res) {
        req.auth.destroy().then(auth => {
            res.json({ msg: "Berhasil di delete" });
        })
    }


}