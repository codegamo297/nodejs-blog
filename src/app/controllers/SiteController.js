const Course = require('../module/Course');
const { mutilpleMongooseToObject } = require('../../util/moogoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        // Course.find({})
        //     .then((courses) => {
        //         res.json(courses);
        //         // console.log(courses)
        //     })
        //     .catch((err) => {
        //         res.status(400).json({ error: 'Error!' });
        //         // console.log(err)
        //     });

        // Course.find({}, function (err, courses) {
        //     if (!err) {
        //         res.json(courses)
        //     } else {
        //         res.status(400).json({ error: 'Error!' })
        //     }
        // })

        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutilpleMongooseToObject(courses),
                });
            })
            .catch((error) => next(error));
    }

    // GET /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
