/**
 * Api配置
 */
module.exports = {
	AssetInfo: '/pc/queryAssetInfoTotal', //首页
	AssetInfoList: '/pc/queryAssetInfoList?borrowType=$id', //专区列表
	AssetInfoDetail: '/pc/queryAssetInfoDetail?pid=$id', //列表详情 
	NoticeList: '/pc/noticeList?type=$id', //公告，动态，法规列表
	NoticeDetail: '/pc/noticeDetail?pid=$id' //公告，动态，法规 详情
};