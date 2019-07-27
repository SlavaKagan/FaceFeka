const mongoose = require('mongoose');

const { APICollectionsModelsEnum } = require('../utils/enums');
const { Posts, Comments } = APICollectionsModelsEnum;
const postModelName = Posts.modelName;
const commentModelName = Comments.modelName;
const commentCollectionNameDB = Comments.collectionNameDB;

const schemaOptions = {
  timestamps: true
};

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId
  },
  privacy: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  attachments: [
    mongoose.Schema.Types.String
  ],
  stats: {
    likes: {
      type: Number,
      required: true
    },
    comments: {
      type: Number,
      required: true
    },
    shares: {
      type: Number,
      required: true
    }
  }
}, schemaOptions);

PostSchema.virtual(commentCollectionNameDB, {
  ref: commentModelName,
  localField: '_id',
  foreignField: 'post'
});

const PostModel = mongoose.model(postModelName, PostSchema);

module.exports = PostModel;