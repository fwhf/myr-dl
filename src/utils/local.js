class LocalClass {
	constructor() {
		if(window.localStorage) {
			this.state = true;
		} else {
			this.state = false;
		}
	}
	set(key, value, day) {
		if(this.state) {
			window.localStorage[key] = JSON.stringify({
				value,
				day: Date.now() + day * 24 * 3600 * 1000
			});
		} else {
			let now = new Date();
			now.setDate(now.getDate() + day);
			document.cookie = `${key}=${value};expires=${now}`;
		}
	}
	get(key) {
		if(this.state) {
			if(window.localStorage[key]) {
				let value = JSON.parse(window.localStorage[key]);
				if(value.day < Date.now()) {
					this.del(key);
					return false;
				} else {
					return value.value
				}
			} else {
				return false
			}
		} else {
			let str = document.cookie;
			let reg = /; /;
			let reg2 = new RegExp(key);
			if(reg.test(str) && reg2.test(str)) {
				return str.split(key)[1].split('=')[1].replace(/;.+/, '');
			} else if(reg2.test(str)) {
				return str.split('=')[1]
			}
			return false
		}
	}
	del(key) {
		if(this.state) {
			window.localStorage.removeItem(key);
		} else {
			this.set(key, "", -1);
		}
	}
}
let Local = new LocalClass();

export default Local