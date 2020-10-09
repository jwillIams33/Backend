import { MongoClient, Collection } from 'https://deno.land/x/mongo/mod.ts';

let collection: Collection<any> | null = null;

export function connect() {
  const client = new MongoClient();

  client.connectWithUri(
    'mongodb+srv://jamal:LFz89Pq95JltufQW@cluster0.ixpzm.mongodb.net/?retryWrites=true&w=majority'
  );

  const db = client.database('course-goals');
  collection = db.collection('goals');
}

function getCollection() {
  return collection;
}

export default getCollection;
