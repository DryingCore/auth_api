const router = require("express").Router();
const verify = require("./VerifyToken");

router.get("/", verify, (req, res) => {
	res.json({
		posts: "something",
		title: "you must be authenticate to see this",
		desc: "it is a auth api",
	});
});

module.exports = router;
