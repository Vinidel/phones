const app = require('./app');
const db = require('./database/models');

const port = process.env.PORT || '3000';

// app.listen(port, () => {
//   console.log(`Server running in port ${port}`);
// })

db.sequelize.authenticate()
  .then(() => app.listen(port, () => {
    console.log(`Server running in port ${port}`);
  }))
  .catch((error) => console.log('Cannot start sever', error));
