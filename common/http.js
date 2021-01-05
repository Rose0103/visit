import axios from 'axios'
import qs from 'qs'
import db from "../common/localstorage"

// 请求添加条件，如token
axios.interceptors.request.use(
	config => {
		config.headers.token = db.get('TOKEN', '')
		if(db.get('TENANT')!=undefined&&db.get('TENANT')!=""&&db.get('TENANT')!="undefined"){
			config.headers.tenant = db.get('TENANT', '')
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// 接口返回处理
axios.interceptors.response.use(
	response => {
		return response
	},
	error => {
		return Promise.reject(error)
	}
)

axios.defaults.adapter = function(config) {
	uni.showLoading({
		title: '请求中,请稍后',
		mask: true
	})
    return new Promise((resolve, reject) => {
        var settle = require('axios/lib/core/settle');
        var resData ;
		const dataRequest = ['PUT', 'POST', 'PATCH']
		if (dataRequest.includes(config.method.toUpperCase())) {
			resData = config.data
		} else {
			resData = config.params
		}
        uni.request({
            method: config.method.toUpperCase(),
            url: config.url,
            header: config.headers,
            data: resData,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };
                settle(resolve, reject, response);
            }
        })
    })
}

export default axios
