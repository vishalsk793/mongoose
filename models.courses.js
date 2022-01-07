var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
    courseName: { type: String, trim: true, required: true },
    courseCode: {
        type: String,
        unique: true,
        validate: [
            function(courseCode) {
                return courseCode.length >= 9;
            },
            'Enter Valid Course Code'
        ]
    },
    author: String,
    edition: Number,
    pubYear: String,
    type: { type: String, enum: ['Text Book', 'Ref Book'] },
    createdAt: { type: Date, default: Date.now },
    website: {
        type: String,
        set: function(url) {
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0) {
                    url = 'http://' + url;
                }
                return url;
            }
        }
    },
});


var Course = mongoose.model('Course', CourseSchema);

module.exports = Course;