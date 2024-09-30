"use strict";

import mongoose from "mongoose";

const DOCUMENT_NAME = "Apikey";
const COLLECTION_NAME = "Apikeys";

// Declare the Schema of the Mongo model
var apiKeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: ["0000", "1111", "22222"],
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
const apiKeyModel = mongoose.model(DOCUMENT_NAME, apiKeySchema);

export default apiKeyModel;
