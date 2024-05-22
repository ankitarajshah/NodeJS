const home = async (req, res, next) => {
  try {
    res.status(200).send("Welcome controller");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res, next) => {
  try {
    res.status(200).send("welome registration controllet");
  } catch (error) {
    res.status(400).send({ msg: "Page not found" });
  }
};
module.exports = { home, register };
