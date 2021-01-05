const db = {
	save(key, value) {
		uni.setStorage({
			key: key,
			data: value,
		});
		// let projectName = process.env.VUE_APP_PROJECT_NAME
		// localStorage.setItem(projectName + "_" + key, JSON.stringify(value))
	},
	get(key, defaultValue = {}) {

		const value = uni.getStorageSync(key);
		if (value) return value

		// let projectName = process.env.VUE_APP_PROJECT_NAME
		// return JSON.parse(localStorage.getItem(projectName + "_" + key)) || defaultValue


	},
	remove(key) {
		uni.removeStorageSync(key);
		// let projectName = process.env.VUE_APP_PROJECT_NAME
		// localStorage.removeItem(projectName + "_" + )
	},
	clear() {
		uni.clearStorage();
		// localStorage.clear()
		
		// let projectName = process.env.VUE_APP_PROJECT_NAME
		// for (const key in localStorage) {
		// 	if (key.indexOf(projectName) !== -1) {
		// 		console.log(key)
		// 		localStorage.removeItem(key)
		// 	}
		// }
	}
}

export default db
