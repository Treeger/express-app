import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    capital: {
        type: Boolean,
        required: [true, 'Is this capital?'],
    },
    location: {
        lat: {
            type: Number,
            required: false,
            min: [-90, 'latitude cant be that small'],
            max: [90, 'latitude cant be that big'],
        },
        long: {
            type: Number,
            required: false,
            min: [-90, 'longitude cant be that small'],
            max: [90, 'longitude cant be that big'],
        }
    },
    updated_at: {type: Date}
});

const updateDate = function (next) {
    this.updated_at = new Date();
    next();
};

CitySchema.pre('save', updateDate)
    .pre('update', updateDate)
    .pre('findOneAndUpdate', updateDate)
    .pre('findByIdAndUpdate', updateDate);

export default mongoose.model('City', CitySchema);