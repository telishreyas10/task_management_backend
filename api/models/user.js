const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: String,
    last_name: String,
    title: String,
    isActive: Boolean,
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

UserSchema.virtual('project', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'users',
    justOne: true
});


const User = mongoose.model('User', UserSchema);

module.exports = User;