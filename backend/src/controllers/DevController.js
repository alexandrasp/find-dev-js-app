const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index( req, res ) {

        const devs = await Dev.find();
        return res.json(devs);
    },

    async store( req, res ) {
        const { github_username, techs, lat, long } = req.body;

        let db_res = await Dev.findOne({ github_username });

        if(!db_res){
            const api_res = await axios.get(`https://api.github.com/users/${github_username}`);

            let { name = login, avatar_url, bio } = api_res.data;

            const techsArray = ParseStringAsArray.parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [lat, long],
            }

            const db_res = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }

        return res.json(db_res);
    }
};