const axios = require('axios');
const DevModel = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const devs = await DevModel.find();

    return res.json(devs);
  },
  async store (req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let newDev = await DevModel.findOne({ github_username });

    if (!newDev) {
      const response = await axios.get(`https://api.github.com/users/${github_username}`)

      const { name = login, avatar_url, bio } = response.data;
  
      const techsArr = parseStringAsArray(techs);
  
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
  
      const newDev = await DevModel.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArr,
        location,
      });
    }
    
    return res.json(newDev);
  }
};