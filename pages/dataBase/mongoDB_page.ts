/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collection, MongoClient, ObjectId } from 'mongodb';

//MongoDB connect
export async function mongoDBConnect(dataBaseName:string, collectionName: string) {
    const client = await MongoClient.connect(process.env.MONGO_URL_QA)
    const dataBase = client.db(dataBaseName);
    const collection = dataBase.collection(collectionName);
      
  return collection
}

export async function generateDateRange() {
    const today: Date = new Date();
    const dates: string[] = [];
    const currentDay = today.toISOString()
  
    for (let i = 0; i < 15; i++) {
      const dayOfMonth: number = today.getDate() > 15 ? 1 : 15;
      const month: number = today.getDate() > 15 ? today.getMonth() + 2 : today.getMonth() + 1;
      const year: number = month > 12 ? today.getFullYear() + 1 : today.getFullYear();
  
      const currentDate = new Date(year, month - 1, dayOfMonth + i);
      dates.push(currentDate.toISOString());
    }
  
  return { dates, currentDay } 
}

export async function cloneAndUpdateEarnings(collection: Collection, itemId: string, startDate: string, duration: string, newStreamId: string,streamDuration: string) {
    const query = { _id: new ObjectId(itemId)}
    const itemResult = await collection.find(query).toArray()
    const newObjectId = new ObjectId();
    const clonedItemResult = Object.assign({}, itemResult[0], {_id: newObjectId, startDate: startDate, durationInMinutes: duration, streams: itemResult[0].streams.map(obj =>Object.assign({}, obj, {streamId: newStreamId,durationInMinutes: streamDuration}))
  })
    await collection.insertOne(clonedItemResult);
}

export async function cloneItem(collection: Collection, streamerId: string) {
  const query = { streamerId: new ObjectId(streamerId)};
  const itemResult = await collection.find(query).toArray();
  const originalDocument = itemResult[0];
  const clonedDocument = {...originalDocument,_id: new ObjectId()}
  const result = await collection.insertOne(clonedDocument);
  const defaultItemId = originalDocument._id.toHexString()
  const clonedItemId = result.insertedId.toHexString()
  return {defaultItemId, clonedItemId}
}

export async function getItemByStreamerId(collection: Collection, streamerId: string,) {
  const query = { streamerId: new ObjectId(streamerId) }
  const itemResult = await collection.find(query).toArray()
  const itemId = itemResult[0]._id
  return { itemResult, itemId }
}

export async function getItemByItemId(collection: Collection, itemId: string) {
  const query = { _id: new ObjectId(itemId) }
  const itemResult = await collection.find(query).toArray()
  return itemResult 
}

export async function deleteItem(collection: Collection, itemId: string) {
  const query = { _id: new ObjectId(itemId) }
  await collection.deleteOne(query)
  console.log(`The Item with the id: ${itemId} is deleted`)
}

