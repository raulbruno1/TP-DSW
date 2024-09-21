import { MikroORM } from "@mikro-orm/core";
import { MongoHighlighter } from "@mikro-orm/mongo-highlighter";
import { MongoDriver } from '@mikro-orm/mongodb';
import * as dotenv from 'dotenv';
dotenv.config(); 

let cli: string;
if (process.env.NODE_ENV === 'production') {
  cli = process.env.CONNECTION_DB as string;
} else if (process.env.NODE_ENV === 'test') {
  cli = process.env.TEST_CONNECTION_DB as string;
} else {
  throw new Error('Invalid NODE_ENV value');
}


export const orm = await MikroORM.init<MongoDriver>({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: process.env.DB_NAME,
  type: 'mongo',
  clientUrl: cli,
  highlighter: new MongoHighlighter(),
  debug: true,
});

export const checkConnection = async () => {
    try {
      await orm.isConnected();
      console.log('Connected to MongoDB successfully.');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
};



