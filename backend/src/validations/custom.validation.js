const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  
  return value;
};

const videoLink = (value, helpers) => {
  if (!value.match(/((https:\/\/www.)?youtube.com\/)[-a-zA-Z0-9@:%_\+.~#?&//=]+/g)) {
    return helpers.message('"{{#label}}" must be a valid video link');
  }

  return value;
};

module.exports = {
  objectId,
  videoLink,
};
