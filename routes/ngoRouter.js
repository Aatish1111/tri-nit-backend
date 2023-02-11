const router = require("express").Router();
let NGO = require("../models/ngoprofile");

router.route("/").get((req, res) => {
  NGO.find()
    .then((ngos) => res.json(ngos))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id/support").post((req, res) => {
  NGO.findById(req.params.id)
    .then((ngo) => {
      ngo.supportCount += 1;
      ngo
        .save()
        .then(() => res.json("NGO supported!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
