import {connection} from './mongoConnection.js';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await connection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

export const tables = getCollectionFn('tables');
export const reservations = getCollectionFn('reservations');