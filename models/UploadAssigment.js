const mongoose = require('mongoose')


const UploadAssigmentSchema = new mongoose.Schema ({
  filename: String,
  contentType: String,
  data: Buffer,
})
module.exports = mongoose.model("UploadAssigment", UploadAssigmentSchema)