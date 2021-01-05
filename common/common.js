import db from "./localstorage"
/**
 * 生成随机字符，默认32位   len：长度
 */
function randomString(len) {　　
	len = len || 32;　　
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
	var maxPos = $chars.length;　　
	var pwd = '';　　
	for(var i = 0; i < len; i++) {　　　　
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
	}　　
	return pwd;
}
const tabBarStr = {
	"showBack":false,
	"backBtnClass":"font-weight: 600;margin-left:28upx;margin-top:6upx",
	"containerStyle":"background:#ffffff",
	"titleStyle": 'font-size:17px;margin-left:28upx;font-weight: 600;'
};
/**
 * 判断是否登录   adrUrl 登录地址参数
 */
function isLogin(){
	const userToken = db.get('TOKEN');
	if(userToken==""||userToken=="undefined"||userToken==undefined){
		return false;
	}else{
		return true;
	}
}
export  default{
	randomString,
	tabBarStr,
	isLogin
}