const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        const { lat, long, techs} = req.query;

        const techsArray = ParseStringAsArray.parseStringAsArray(techs);
        
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    type: 'Point',
                    coordinates: [long, lat],  

                },
                $maxDistance: 10000,
            }
        });

        return res.json({ devs });
        
    }
}