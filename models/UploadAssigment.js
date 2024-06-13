const mongoose = require('mongoose')


const UploadAssigmentSchema = new mongoose.Schema ({
  filename: "string",
  contentTyp: "string",
  data: Buffer,
})
module.exports = mongoose.model("UploadAssigment", UploadAssigmentSchema)