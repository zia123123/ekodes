const express = require('express');
const router = express.Router();


// Middlewares
//const auth_regional = require('./middlewares/auth-regional');

//
//const AuditPolicy = require('./policy/AuditPolicy');





const ChatController = require('./controller/ChatController');
const BeritaController = require('./controller/BeritaController');
const UserController = require('./controller/UserController');
const VoteController = require('./controller/VoteController');

const VotedController = require('./controller/VotedController');

const CalonController = require('./controller/CalonController');


const PasienController = require('./controller/PasienController');


const MinumObatController = require('./controller/MinumObatController');

const FeedsController = require('./controller/FeedsController');


const KecamatanController = require('./controller/KecamatanController');
const KelurahanController = require('./controller/KelurahanController');
const AuthController = require('./controller/AuthController');
const TokoController = require('./controller/TokoController');
const ProductController = require('./controller/ProductController');
const OjekController = require('./controller/OjekController');
const TransaksiController = require('./controller/TransaksiController');




const multer = require('multer')
const multerConf = {
    storage: multer.diskStorage({
        destination : function(req,file, next){
            next(null,'./app/public/images')
        },
        filename: function(req, file, next){
            const ext = file.mimetype.split('/')[1]
            next(null, file.fieldname+ '-' +Date.now()+ '.' +ext)
        }
    }),
    Filefilter: function(req,file,next){
        if(!file){
            next()
        }
        const image = file.mimetype.startsWidth('images/')
        if(image){
            next(null,true)
        }else{
            next({
                message: "File Not Supported"
            }, false)
        }
    }
};

//kecamatan
router.post('/api/kecamatan/create',multer(multerConf).fields([{
    name: 'photo', maxCount: 1
    }
]), KecamatanController.create);
router.get('/api/kecamatan/', KecamatanController.index);
router.patch('/api/kecamatan/update/:id',KecamatanController.find, KecamatanController.update);
router.get('/api/kecamatan/:id',KecamatanController.find, KecamatanController.show);
router.delete('/api/kecamatan/delete/:id',KecamatanController.find, KecamatanController.delete);

//kelurahan
router.post('/api/kelurahan/create', KelurahanController.create);
router.get('/api/kelurahan/', KelurahanController.index);
router.patch('/api/kelurahan/update/:id',KelurahanController.find, KelurahanController.update);
router.get('/api/kelurahan/:id',KelurahanController.find, KelurahanController.show);
router.delete('/api/kelurahan/delete/:id',KelurahanController.find, KelurahanController.delete);

//auth
router.post('/api/auth/create', AuthController.signupUser);
router.post('/api/auth/login', AuthController.signInUser);
router.get('/api/auth/', AuthController.index);
router.patch('/api/auth/update/:id',AuthController.find, AuthController.update);
router.get('/api/auth/:id',AuthController.find, AuthController.show);
router.delete('/api/auth/delete/:id',AuthController.find, AuthController.delete);

//toko
router.post('/api/toko/create',multer(multerConf).fields([{
    name: 'photo', maxCount: 1
    }
]), TokoController.create);
router.get('/api/toko/', TokoController.index);
router.patch('/api/toko/update/:id',TokoController.find, TokoController.update);
router.get('/api/toko/:id',TokoController.find, TokoController.show);
router.delete('/api/toko/delete/:id',TokoController.find, TokoController.delete);

//product
router.post('/api/product/create',multer(multerConf).fields([{
    name: 'photo', maxCount: 1
    }
]), ProductController.create);
router.get('/api/product/', ProductController.index);
router.patch('/api/product/update/:id',ProductController.find, ProductController.update);
router.get('/api/product/:id',ProductController.find, ProductController.show);
router.get('/api/producttoko/',ProductController.indexByToko);

router.delete('/api/product/delete/:id',ProductController.find, ProductController.delete);

//ojek
router.post('/api/ojek/create',multer(multerConf).fields([{
    name: 'photo', maxCount: 1
    }
]), OjekController.create);
router.get('/api/ojek/', OjekController.index);
router.patch('/api/ojek/update/:id',OjekController.find, OjekController.update);
router.get('/api/ojek/:id',OjekController.find, OjekController.show);
router.delete('/api/ojek/delete/:id',OjekController.find, OjekController.delete);

//transaksi
router.post('/api/tranksaksi/create', TransaksiController.create);
router.get('/api/tranksaksi/', TransaksiController.index);
router.patch('/api/tranksaksi/update/:id',TransaksiController.find, TransaksiController.update);
router.get('/api/tranksaksi/:id',TransaksiController.find, TransaksiController.show);
router.delete('/api/tranksaksi/delete/:id',TransaksiController.find, TransaksiController.delete);

router.get('/api/mytranksaksi/', TransaksiController.indexMyOrder);
router.get('/api/pembeli/mytranksaksi/', TransaksiController.indexMyOrderPembeli);











//createvalidate
router.post('/api/validate/', UserController.createValidate);
//user
router.get('/api/user/', UserController.index);
router.post('/api/validate/', UserController.createValidate);

router.patch('/api/update/validate/:id', UserController.findValidate, UserController.updateValidate);

router.put('/api/nama/update/:id', UserController.findValidate, UserController.updateNama);

router.put('/api/updatert/user/:id', UserController.findValidate, UserController.updateRt);

router.get('/api/validate/index', UserController.indexvalidate);
router.post('/api/user/create', UserController.signupUser);
router.post('/api/login', UserController.signInUser);
router.post('/api/user/cekktp',UserController.cektp, UserController.cekstatus);
router.get('/api/user/getdata/:ktp',UserController.cektpku, UserController.show);
//update to true
router.post('/api/user/totrue',UserController.cektp, UserController.updateTrue);
//RESET PASSWORD
router.get('/api/user/reset/:ktp', UserController.findKtp,UserController.updatePassword);


//berita
router.post('/api/berita/create',multer(multerConf).fields([{
    name: 'photo', maxCount: 1
    }
]), BeritaController.create);
router.get('/api/berita/', BeritaController.index);
router.patch('/api/berita/update/:id',BeritaController.find, BeritaController.update);
router.get('/api/berita/:id',BeritaController.find, BeritaController.show);
router.patch('/api/berita/delete/:id',BeritaController.find, BeritaController.delete);

//vote
router.post('/api/vote/create',multer(multerConf).fields([{
    name: 'photo', maxCount: 1
    }
]), VoteController.create);
router.get('/api/vote/', VoteController.index);
router.patch('/api/vote/update/:id',VoteController.find, VoteController.update);
router.get('/api/vote/:id',VoteController.find, VoteController.show);
router.get('/api/vote/rt/:rt',VoteController.findRt, VoteController.show);
router.delete('/api/vote/delete/:id',VoteController.find, VoteController.delete);

//calon
router.post('/api/calon/create',multer(multerConf).fields([{
    name: 'photo', maxCount: 1
    }
]), CalonController.create);
router.get('/api/calon/:voteId', CalonController.indexCalon);

router.patch('/api/calon/update/:id',CalonController.find, CalonController.update);
router.get('/api/calon/:id',CalonController.find, CalonController.show);
router.patch('/api/calon/delete/:id',CalonController.find, CalonController.delete);

router.get('/api/all/calon/', CalonController.indexAll);
//voted
router.post('/api/voted/create', VotedController.create);
router.get('/api/voted/:voteid/:ktp', VotedController.find);
router.get('/api/voted/vote', VotedController.index);
router.get('/api/voted/all', VotedController.indeAll);
router.get('/api/log/:voteId', VotedController.index);

router.get('/api/bar/:voteid', VotedController.indexBar);




router.post('/api/pasien/create', PasienController.create);
router.post('/api/pasien/login', PasienController.sign);
router.get('/api/pasien/', PasienController.index);

router.get('/api/pasien/jumlah', PasienController.jumlahpasien);
router.get('/api/pasien/jumlahminum', PasienController.jumlahpasienminum);

router.patch('/api/pasien/update/:id',PasienController.find, PasienController.update);
router.get('/api/pasien/:id',PasienController.find, PasienController.show);    

router.patch('/api/pasien/updateobat/:id',PasienController.find, PasienController.updateJumlahObat);              
router.patch('/api/pasien/updatehari/:id',PasienController.find, PasienController.updateJumlahHari);              


//minum
router.post('/api/minum/create', MinumObatController.create);
router.get('/api/minum/index', MinumObatController.indexMinumsemua);
router.get('/api/minum/pasien/:pasienId', MinumObatController.indexMinum);


//feeds
router.post('/api/feed/create', FeedsController.create);
router.get('/api/feed/', FeedsController.index);
router.get('/api/feed/:id',FeedsController.find, FeedsController.show);
router.delete('/api/feed/delete/:id',FeedsController.find, FeedsController.delete);


//chat
router.post('/api/chat/create', ChatController.create);
router.get('/api/chat/', ChatController.index);
router.get('/api/chat/transaksi', ChatController.indexChat);
router.delete('/api/chat/delete/:id',ChatController.find, ChatController.delete);

module.exports = router;