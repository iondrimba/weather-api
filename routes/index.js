module.exports = (req, res) => {
  const data = {
    message: 'Welcome to our restful API',
  };

  res.status(200).send(data);
};
