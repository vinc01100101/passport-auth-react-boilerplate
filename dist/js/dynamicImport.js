/* conditional modules/ dynamic imports */

const page = document.querySelector("#page").textContent;

//the dynamic import
import(`./${page}.js`);

// (() => {
// 	switch (page) {
// 		case "home":
// 			import("./home.js");
// 			break;
// 		case "profile":
// 			import("./profile.js");
// 			break;
// 		case "register":
// 			import("./register.js");
// 			break;
// 		default:
// 			import("./home.js");
// 			break;
// 	}
// })();
