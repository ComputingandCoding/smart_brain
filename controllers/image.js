const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "0dbb0c6588174d21b794b6764a7082bb",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("unable to work with api"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => {
      res.status(404).json("Unable to get entries");
    });
};

module.exports = {
  handleImage,
  handleApiCall,
};
