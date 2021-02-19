const app = require('./server');

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}.`);
});