import mongoose, { ConnectionStates } from 'mongoose';
import { mongoDbURI, isProduction } from './environment';

const connection: { isConnected: ConnectionStates | boolean } = {
  isConnected: false,
};

async function connect(): Promise<void> {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(mongoDbURI);
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect(): Promise<void> {
  if (connection.isConnected) {
    if (isProduction) {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

function convertDocToObj(doc: any): any {
  return JSON.parse(JSON.stringify(doc));
}

export const db = { connect, disconnect, convertDocToObj };
