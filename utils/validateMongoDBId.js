import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema
const validateMongoDbId = (id) => {
  const isValid = mongoose.Schema.Types.ObjectId.isValid(id)
  if (!isValid) throw new Error('This id is not valid or not Found')
}
export { validateMongoDbId }
