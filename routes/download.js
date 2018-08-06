var express = require('express');
var router = express.Router();
var path = require('path');
var word = path.join(__dirname, '../public/images/pdf/亚租所机构入会申请书.docx');
router.get('/DownLoad',function(req,res){   
    res.download(word)

})


module.exports = router;