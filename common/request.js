import axios from 'axios'
import store from '../store/index'
import {
	getToken,
	getRefreshToken,
	getExpireTime
} from './auth'
import axiosApi from './http';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// const urlPrefix = "http://www.njzyit.com:8760/api/";

const urlPrefix = "https://visit.yangguangshitang.com/api/";
// const urlPrefix = "https://visit.eetcm.com/api/";

function showErrMsg(msg) {
	uni.showToast({
		title: msg,
		icon: 'none',
		mask: true,
	});
}

const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 10000,
	responseType: 'json',
	validateStatus(status) {
		return status === 200
	}
})

const refresh_service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 10000,
	responseType: 'json',
	validateStatus(status) {
		return status === 200
	}
})

service.interceptors.request.use(
	config => {
		let _config = config
		try {
			const expireTime = getExpireTime()
			if (expireTime) {
				const left = expireTime - new Date().getTime()
				const refreshToken = getRefreshToken()
				if (left < 5 * 60 * 1000 && refreshToken) {
					_config = queryRefreshToken(_config, refreshToken)
				} else {
					if (getToken()) {
						_config.headers['Authorization'] = 'bearer ' + getToken()
					}
				}
			}
		} catch (e) {
			console.error(e)
		}
		return _config
	},
	error => {
		return Promise.reject(error)
	}
)

// response interceptor
service.interceptors.response.use((config) => {
	return config
}, (error) => {
	if (error.response) {
		const errorMessage = error.response.data === null ? '系统内部异常，请联系网站管理员' : error.response.data.message
		switch (error.response.status) {
			case 404:
				showErrMsg('很抱歉，资源未找到')
				break
			case 403:
				showErrMsg('很抱歉，您暂无该操作权限')
				break
			case 401:
				showErrMsg('很抱歉，认证已失效，请重新登录')
				break
			default:
				if (errorMessage) {
					showErrMsg(errorMessage)
				}
				break
		}
	}
	return Promise.reject(error)
})

function tansParams(params) {
	let result = ''
	Object.keys(params).forEach((key) => {
		if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
			result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
		}
	})
	return result
}

async function queryRefreshToken(config, refreshToken) {
	const result = await request.refresh('authority/anno/login', {
		// const result = await request.refresh('auth/oauth/token', {
		refresh_token: refreshToken
	})
	if (result.status === 200) {
		saveData(result.data)
		config.headers['Authorization'] = 'bearer ' + getToken()
	}
	return config
}

function saveData(data) {
	store.commit('account/setAccessToken', data.access_token)
	store.commit('account/setRefreshToken', data.refresh_token)
	const current = new Date()
	const expireTime = current.setTime(current.getTime() + 1000 * data.expires_in)
	store.commit('account/setExpireTime', expireTime)
}

function buildUrl(path) {
	if (path) return urlPrefix + path;
	return urlPrefix

}



function valueByKeyString(data, key) {
	let leftIndex = key.indexOf("[");
	if (leftIndex < 0) {
		return data[key] || "";
	} else {
		let rightIndex = key.indexOf("]");
		if (rightIndex < 0) {
			return data[key] || "";
		} else {
			return data[key.substring(0, leftIndex)][key.substring(leftIndex + 1, rightIndex)] || "";
		}
	}
}

function getValue(data, keys) {
	try {
		let index = keys.indexOf(".");
		if (index < 0) {
			return valueByKeyString(data, keys);
		} else {
			let value = valueByKeyString(data, keys.substring(0, index));
			if (value) {
				return getValue(value, keys.substring(index + 1));
			} else {
				return "";
			}
		}
	} catch (e) {
		return "";
	}
}
// function getValue(data, key) {
// 	try {
// 		let index = key.indexOf(".");
// 		if (index < 0) {
// 			return data[key] || "";
// 		} else {
// 			let value = data[key.substring(0, index)];
// 			if (value) {
// 				return getValue(value, key.substring(index + 1));
// 			} else {
// 				return "";
// 			}
// 		}
// 	} catch (e) {
// 		return "";
// 	}
// }

// const request = {
// 	refresh(url, params) {
// 		params['grant_type'] = 'refresh_token'
// 		return refresh_service.post(buildUrl(url), params, {
// 			transformRequest: [(params) => {
// 				return tansParams(params)
// 			}],
// 			headers: {
// 				'Authorization': 'Basic ZmViczoxMjM0NTY='
// 			}
// 		})
// 	},
// 	login(url, params) {
// 		params['grant_type'] = 'password'
// 		return service.post(buildUrl(url), params, {
// 			transformRequest: [(params) => {
// 				return tansParams(params)
// 			}],
// 			headers: {
// 				'Authorization': 'Basic ZmViczoxMjM0NTY='
// 			}
// 		})
// 	},
// 	post(url, params) {
// 		return service.post(buildUrl(url), params, {
// 			transformRequest: [(params) => {
// 				return tansParams(params)
// 			}],
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded'
// 			}
// 		})
// 	},
// 	put(url, params) {
// 		return service.put(buildUrl(url), params, {
// 			transformRequest: [(params) => {
// 				return tansParams(params)
// 			}],
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded'
// 			}
// 		})
// 	},
// 	get(url, params) {
// 		let _params
// 		if (Object.is(params, undefined)) {
// 			_params = ''
// 		} else {
// 			_params = '?'
// 			for (const key in params) {
// 				if (params.hasOwnProperty(key) && params[key] !== null) {
// 					_params += `${key}=${params[key]}&`
// 				}
// 			}
// 		}
// 		return service.get(`${buildUrl(url)}${_params}`)
// 	},
// 	delete(url, params) {
// 		let _params
// 		if (Object.is(params, undefined)) {
// 			_params = ''
// 		} else {
// 			_params = '?'
// 			for (const key in params) {
// 				if (params.hasOwnProperty(key) && params[key] !== null) {
// 					_params += `${key}=${params[key]}&`
// 				}
// 			}
// 		}
// 		return service.delete(`${buildUrl(url)}${_params}`)
// 	},
// 	download(url, params, filename) {
// 		NProgress.start()
// 		return service.post(buildUrl(url), params, {
// 			transformRequest: [(params) => {
// 				return tansParams(params)
// 			}],
// 			responseType: 'blob'
// 		}).then((r) => {
// 			const content = r.data
// 			const blob = new Blob([content])
// 			if ('download' in document.createElement('a')) {
// 				const elink = document.createElement('a')
// 				elink.download = filename
// 				elink.style.display = 'none'
// 				elink.href = URL.createObjectURL(blob)
// 				document.body.appendChild(elink)
// 				elink.click()
// 				URL.revokeObjectURL(elink.href)
// 				document.body.removeChild(elink)
// 			} else {
// 				navigator.msSaveBlob(blob, filename)
// 			}
// 			NProgress.done()
// 		}).catch((r) => {
// 			console.error(r)
// 			NProgress.done()
// 			showErrMsg('下载失败')

// 		})
// 	},
// 	upload(url, params) {
// 		return service.post(buildUrl(url), params, {
// 			headers: {
// 				'Content-Type': 'multipart/form-data'
// 			}
// 		})
// 	}
// }

const request = {
	refresh(url, params) {
		params['grant_type'] = 'refresh_token';
		return refresh_service.post(buildUrl(url), params, {
			transformRequest: [
				(params) => {
					return tansParams(params);
				}
			],
			headers: {
				Authorization: 'Basic ZmViczoxMjM0NTY='
			}
		});
	},
	login(url, params) {
		params['grant_type'] = 'password';
		return service.post(buildUrl(url), params, {
			transformRequest: [
				(params) => {
					return tansParams(params);
				}
			],
			headers: {
				Authorization: 'Basic ZmViczoxMjM0NTY='
			}
		});
	},
	post(url, params) {
		return axiosApi({
			url: buildUrl(url),
			method: 'POST',
			data: params
		}).then(function(res) {
			uni.hideLoading();
			const data = res.data;
			if (data.code == 40001) {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: data.msg,
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: "/pages/login/pwdLogin"
							})
						}
					}
				});
			} else {
				return data;
			}
		});
	},
	put(url, params) {
		return axiosApi({
			url: buildUrl(url),
			method: 'PUT',
			data: params
		}).then(function(res) {
			uni.hideLoading();
			const data = res.data;
			if (data.code == 40001) {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: data.msg,
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: "/pages/login/pwdLogin"
							})
						}
					}
				});
			} else {
				return data;
			}
		});
	},
	get(url, params) {
		let _params;
		if (Object.is(params, undefined)) {
			_params = '';
		} else {
			_params = '?';
			for (const key in params) {
				if (params.hasOwnProperty(key) && params[key] !== null) {
					_params += `${key}=${params[key]}&`;
				}
			}
		}
		return axiosApi({
			url: buildUrl(url) + _params,
			method: 'GET',
			// formData: true,
			data: params
		}).then(function(res) {
			uni.hideLoading();
			const data = res.data;
			if (data.code == 40001) {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: data.msg,
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: "/pages/login/pwdLogin"
							})
						}
					}
				});
			} else {
				return data;
			}
		});
	},

	del(url, params) {
		let _params;
		if (Object.is(params, undefined)) {
			_params = '';
		} else {
			_params = '?';
			for (const key in params) {
				if (params.hasOwnProperty(key) && params[key] !== null) {
					_params += `${key}=${params[key]}&`;
				}
			}
		}
		return axiosApi({
			url: buildUrl(url) + _params,
			method: 'DELETE',
			data: params
		}).then(function(res) {
			uni.hideLoading();
			const data = res.data;
			if (data.code == 40001) {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: data.msg,
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: "/pages/login/pwdLogin"
							})
						}
					}
				});
			} else {
				return data;
			}
		});
	},

	delete(url, params) {
		let _params;
		if (Object.is(params, undefined)) {
			_params = '';
		} else {
			_params = '?';
			for (const key in params) {
				if (params.hasOwnProperty(key) && params[key] !== null) {
					_params += `${key}=${params[key]}&`;
				}
			}
		}
		return axiosApi({
			url: buildUrl(url) + _params,
			method: 'DELETE',
			data: params
		}).then(function(res) {
			uni.hideLoading();
			const data = res.data;
			if (data.code == 40001) {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: data.msg,
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: "/pages/login/pwdLogin"
							})
						}
					}
				});
			} else {
				return data;
			}
		});
	},
	download(url, params, filename) {
		NProgress.start();
		return service
			.post(buildUrl(url), params, {
				transformRequest: [
					(params) => {
						return tansParams(params);
					}
				],
				responseType: 'blob'
			})
			.then((r) => {
				uni.hideLoading();
				const content = r.data;
				if (data.code == 40001) {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: data.msg,
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "/pages/login/pwdLogin"
								})
							}
						}
					});
				} else {
					const blob = new Blob([content]);
					if ('download' in document.createElement('a')) {
						const elink = document.createElement('a');
						elink.download = filename;
						elink.style.display = 'none';
						elink.href = URL.createObjectURL(blob);
						document.body.appendChild(elink);
						elink.click();
						URL.revokeObjectURL(elink.href);
						document.body.removeChild(elink);
					} else {
						navigator.msSaveBlob(blob, filename);
					}
					NProgress.done();
				}

			})
			.catch((r) => {
				console.error(r);
				NProgress.done();
				showErrMsg('下载失败');
			});
	},
	upload(url, params) {
		return service.post(buildUrl(url), params, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	}
};

export {
	request,
	buildUrl,
	getValue
}
