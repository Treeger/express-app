import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    updated_at: {type: Date}
});

const updateDate = function (next) {
    this.updated_at = new Date();
    next();
};

userSchema.pre('save', updateDate)
    .pre('update', updateDate)
    .pre('findOneAndUpdate', updateDate)
    .pre('findByIdAndUpdate', updateDate);

export default mongoose.model('user', userSchema);