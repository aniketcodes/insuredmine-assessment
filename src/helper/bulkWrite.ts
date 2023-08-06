import mongoose, { Model, FilterQuery, UpdateQuery, MongooseBulkWriteOptions } from 'mongoose';

async function bulkWriteDocuments<T>(
  model: Model<T>,
  docs: T[],
  field:any,
  options?: MongooseBulkWriteOptions,
): Promise<void> {
  const bulkOps = docs.map((doc) => ({
    updateOne: {
      filter: { [field]: (doc as any)[field] },
      update: doc,
      upsert: true,
    },
  }));

  await model.bulkWrite(bulkOps, options);
}

export default bulkWriteDocuments;