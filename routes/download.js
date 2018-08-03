var express = require('express');
var router = express.Router();
var path = require('path');
var word = path.join(__dirname, '../public/images/pdf/sqs.docx');
router.get('/DownLoad',function(req,res){   
    res.download(word)

})


module.exports = router;