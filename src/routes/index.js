import userRoutes from './users.js';
import resRoutes from './reservations.js';
import tableRoutes from './tables.js';

const constructorMethod = (app) => {
  app.use('/users', userRoutes);
  app.use('/reservations', resRoutes);
  app.use('/tables', tableRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;