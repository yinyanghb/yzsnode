

var imgs = [
    '../images/dynamic.png',
    '../images/usbg.png',
    '../images/organ_bg.png',
    '../images/about-bg.png',
    '../images/aboutbg.jpg',
    '../images/info-bg.png',
    '../images/bg.png',
    '../images/license.png',
    '../images/flow-bg.png',
    '../images/Reply.png',
    '../images/charter.png',
    '../images/qrcode.png',
];
var imgWrap = [];
function preloadImg(arr) {
    for(var i =0; i< arr.length ;i++) {
        imgWrap[i] = new Image();
        imgWrap[i].src = arr[i];
    }
}
preloadImg(imgs);