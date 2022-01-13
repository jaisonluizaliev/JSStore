import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnected) {
    return console.log('already connected');
  }
  // connections is a array
  if (mongoose.connections.lenght > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      return console.log('use previous connection');
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  console.log('new connection');

  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}


function convertDocToObj (obj) {
  obj._id = obj._id.toString();
  obj.createdAt = obj.createdAt.toString();
  obj.updatedAt = obj.updatedAt.toString();
  return obj;
}

const db = { connect, disconnect, convertDocToObj };

export default db;
