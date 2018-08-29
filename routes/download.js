var express = require('express');
var router = express.Router();
var path = require('path');
var word = path.join(__dirname, '../public/images/pdf/application.docx');
router.get('/DownLoad',function(req,res){   
    res.download(word,'机构入会申请书.docx')
})
module.exports = router;