const phoneBook = require("../model/phoneBookmodel");

// controller to create entries
exports.createEntry = async (req, res) => {
  try {
    const entry = new phoneBook(req.body);
    await entry.save();
    res.status(201).send(entry);
  } catch (err) {
    res.status(400).send(err);
  }
};

// controller to get entries with pagination
exports.getEntry = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const pageInt = parseInt(page);
  const limitInt = parseInt(limit);

  try {
    const totalEntries = await phoneBook.countDocuments({});
    const totalPages = Math.ceil(totalEntries / limitInt);
    const entries = await phoneBook
      .find()
      .limit(limitInt)
      .skip((pageInt - 1) * limitInt);

    res.send({
      entries,
      page: pageInt,
      limit: limitInt,
      totalPages,
      totalEntries,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// controller to update entries
exports.updateEntry = async (req, res) => {
  try {
    const entry = await phoneBook.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!entry) {
      return res.status(404).send();
    }
    res.send(entry);
  } catch (error) {
    res.status(400).send(error);
  }
};

// controller to delete entries
exports.deleteEntry = async (req, res) => {
  try {
    const entry = await phoneBook.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).send();
    }
    res.send(entry);
  } catch (error) {
    res.status(500).send(error);
  }
};

// controller to search entries based on name,number,email
exports.searchEntry = async (req, res) => {
  const { query } = req.query;
  const searchCriteria = {
    $or: [
      { name: { $regex: query, $options: "i" } },
      { phoneNumber: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
    ],
  };
  try {
    const entries = await phoneBook.find(searchCriteria);
    res.send(entries);
  } catch (error) {
    res.status(500).send(error);
  }
};
