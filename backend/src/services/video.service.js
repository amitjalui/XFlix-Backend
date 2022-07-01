const { Video } = require("../models/index");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const Values = require("../utils/values.js");
const { all } = require("express/lib/application");

const getVideos = async (title, contentRating, genres, sortBy) => {
  const titleMatch = { title: { $regex: title, $options: "i" } };

  const getContentRating = getPossibleContentRatings(contentRating);
  const contentRatingMatch = { contentRating: { $in: getContentRating } };

  let genreMatch = { genre: genres };
  if (genres === "All") {
    genreMatch = null;
  }

  let videos;
  if (title === "" && contentRating === "All" && genres === "") {
    videos = await Video.find({});
  } else {
    videos = await Video.find({
      ...titleMatch,
      ...contentRatingMatch,
      ...genreMatch,
    });
  }

  const sortedVideos = sortVideos(videos, sortBy);

  return sortedVideos;
};

const getPossibleContentRatings = (contentRating) => {
  const contentRatings = [...Values.contentRatings];
  if (contentRating === "All") {
    return contentRatings;
  }
 
  const contentRatingIndex = contentRatings.indexOf(contentRating); 
  const possibleContentRatings = contentRatings.splice(contentRatingIndex);
   
  return possibleContentRatings;
};

const sortVideos = (videos, sortBy) => {
  videos.sort((video1, video2) => {
    let field1 = video1[sortBy];
    let field2 = video2[sortBy];
    if (sortBy === "releaseDate") {
      field1 = new Date(field1).getTime();
      field2 = new Date(field2).getTime();
    }
    if (field1 > field2) return -1;
    return 1;
  });
  return videos;
};

const getVideoById = async (id) => {
  return await Video.findById(id);
};

const addVideo = async (body) => {
  let videoAdded = await Video.findOne({ videoLink: body.videoLink });
 
  if (!videoAdded) {
    try {
      videoAdded = await Video.create({
        ...body,
      });
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Video unable to post");
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Video already exist");
  }
 
  await videoAdded.save();
  return videoAdded;
};

const changeVotes = async (videoId, vote, change) => {
  const video = await Video.findById(videoId);
 
  if(!video) return;
 
  let changeVoteType = '';
  if (vote === 'upVote') {
    changeVoteType = 'upVotes';
  } else {
    changeVoteType = 'downVotes';
  }
 
  const prevVotes = video.votes[changeVoteType];
  let newVotes = prevVotes;
  if (change === 'increase') {
    newVotes += 1;
  } else {
    newVotes -= 1;
  }
 
  newVotes = Math.max(newVotes, 0);
  video.votes[changeVoteType] = newVotes;
  await video.save();
  return;
}

const changeViews = async(videoId) => {
  const video = await Video.findById(videoId);
  if (video) {
    video.viewCount += 1;
    await video.save();
  }
  return;
}


module.exports = {
  getVideoById,
  getVideos,
  addVideo,
  changeVotes,
  changeViews,
};
