const { basedir } = global;
const { createError } = require(`${basedir}/helpers`);
const { Contact } = require(`${basedir}/models/contact`);

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw createError(404);
    }
    res.json({ message: "Contact`s deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
