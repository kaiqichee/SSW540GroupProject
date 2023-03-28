import userRoutes from './users.js';
import resRoutes from './reservations.js';
// import tableRoutes from './tables.js';
import cors from "cors";

const constructorMethod = (app) => {
  app.options('/users', cors());
  app.use('/users', userRoutes);
  app.options('/reservations', cors());
  app.use('/reservations', resRoutes);
  // app.options('/tables', cors());
  // app.use('/tables', tableRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;