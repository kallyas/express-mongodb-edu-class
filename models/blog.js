const mongoos = require('mongoose');

const blogSchema = mongoos.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoos.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

module.exports = mongoos.model('Blog', blogSchema);