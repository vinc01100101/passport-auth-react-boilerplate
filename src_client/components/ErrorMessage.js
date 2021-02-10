const React = require("react");
const errorDom = document.querySelector("#errorDom").textContent;

module.exports = () => <p style={{ color: "red" }}>{errorDom}</p>;
