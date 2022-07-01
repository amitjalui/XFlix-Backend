const Joi = require('joi');
const { objectId, videoLink } = require('./custom.validation');
const { genres, contentRatings, sortBy } = require('../utils/values.js');
const Values = require("../utils/values");



const getVideo = {
    params: Joi.object().keys({
        videoId: Joi.string().custom(objectId),
    })
}

const customJoi = Joi.extend((joi) => ({
    type: 'stringArray',
    base: Joi.array(),
    coerce(value) {
        return { value: value.split ? value.split(',') : value }
    },
}))

const searchVideos = {
    query: Joi.object().keys({
        title: Joi.string(),
        genres: customJoi.stringArray().items(Joi.string().valid(...genres, 'All')),
        contentRating: Joi.string().valid(...contentRatings, 'All'),
        sortBy: Joi.string().valid(...sortBy),
    }),
};

const addVideo = {
    body: Joi.object().keys({
        videoLink: Joi.string().required().custom(videoLink),
        title: Joi.string().required(),
        genre: Joi.string().required().valid(...genres),
        contentRating: Joi.string().required().valid(...contentRatings),
        releaseDate: Joi.string().required(),
        previewImage: Joi.string().required(),
    })
}

const updateVotes = {
    params: Joi.object().keys({
        videoId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        vote: Joi.string().required().valid(...Values.updateVoteTypes),
        change: Joi.string().required().valid(...Values.changeVoteTypes)    
    })
}

const updateViews = {
    params: Joi.object().keys({
        videoId: Joi.required().custom(objectId),
    })
}

module.exports = { getVideo, searchVideos, addVideo, updateVotes, updateViews };

