const medicines = require("../../../models/medicines");
const searchMedicine = async (req, res) => {
  try {
    console.log("goind");
    const letter = req.params.letter || "";

    const offset = req.query.offset || 0;
    const limit = req.query.limit || 10;
    console.log(letter);
    const data =
      letter != ""
        ? await medicines
            .find({
              name: { $regex: `^${letter}`, $options: "i" },
            })
            .skip(offset)
            .limit(limit)
        : await medicines.find().skip(offset).limit(limit);

    res.status(200).json({ data: data });
  } catch (err) {
    console.log("goind");
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
module.exports = searchMedicine;
