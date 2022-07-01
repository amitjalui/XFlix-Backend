const mongoose = require("mongoose");
const { genres, contentRatings } = require("../utils/values");

const videoSchema = mongoose.Schema({
  videoLink: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },

  title: {
    type: String,
    require: true,
    trim: true,
  },

  genre: {
    type: String,
    require: true,
    validate(value) {
      if (!genres.includes(value)) {
        throw new Error("Invalid genre");
      }
    },
  },

  contentRating: {
    type: String,
    require: true,
    validate(value) {
      if (!contentRatings.includes(value)) {
        throw new Error("Invalid contentrating");
      }
    },
  },

  releaseDate: {
    type: String,
    require: true,
    trim: true,
  },

  previewImage: {
    type: String,
    trim: true,
    default: "https://i.ibb.co/nbYsmJB/Xflix.jpg",
  },

  votes: {
    upVotes: {
      type: Number,
      default: 0
    },
    downVotes: {
      type: Number,
      default: 0
    }
  },

  viewCount: {
    type: Number,
    default: 0,
  },
  
});

const Video = mongoose.model("Video", videoSchema);

module.exports.Video = Video;
