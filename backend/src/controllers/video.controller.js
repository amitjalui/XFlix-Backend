const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services/index");

const getVideoById = catchAsync(async (req, res) => {
  const video = await videoService.getVideoById(req.params.videoId);

  if (video) {
    res.status(httpStatus.OK).json(video);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "No Video Found");
  }
});

const getVideos = catchAsync(async (req, res) => {
  const title = req.query.title ? req.query.title : "";
  const contentRating = req.query.contentRating
    ? req.query.contentRating
    : "All";
  const genres = req.query.genres ? req.query.genres : "All";
  const sortBy = req.query.sortBy ? req.query.sortBy : "releaseDate";

  const videos = await videoService.getVideos(
    title,
    contentRating,
    genres,
    sortBy
  );

  if (videos) {
    res.status(httpStatus.OK).send({ videos });
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "No Video Found");
  }
});

const addVideo = catchAsync(async (req, res) => {
  // const {title, videoLink, genre, contentRating, releaseDate, previewImage} = req.body;
  const video = await videoService.addVideo(req.body);

  res.status(httpStatus.CREATED).send(video);
});

const changeVotes = catchAsync(async (req, res) => {

  await videoService.changeVotes(req.params.videoId, req.body.vote, req.body.change);

  res.status(204).send();
});

const changeViews = catchAsync(async (req, res) => {
  const videoId = req.params.videoId;
  await videoService.changeViews(videoId);
  res.status(204).send();
});

module.exports = { getVideoById, getVideos, addVideo, changeVotes, changeViews };

