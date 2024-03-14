const Course = require('../module/Course');
const { mutilpleMongooseToObject } = require('../../util/moogoose');

class MeController {
    // GET /me/stored/courses
    storedCourses(req, res, next) {
        
        let courseQuery = Course.find({})

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) => {
                res.render('me/stored-courses', {
                    deleteCount,
                    courses: mutilpleMongooseToObject(courses)
                })
            })
            .catch(next)

        /*
        Course.countDocumentsDeleted()
            .then( (deleteCount) => {
                console.log(deleteCount)
            })
            .catch( () => {})

        Course.find({})
            .then( courses => res.render('me/stored-courses', {
                courses: mutilpleMongooseToObject(courses)
            }))
            .catch(next)
        */
    }

    // GET /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then( courses => res.render('me/trash-courses', {
                courses: mutilpleMongooseToObject(courses)
            }))
            .catch(next)
    }
}

module.exports = new MeController();
