import mongoose from 'mongoose';

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel(),
    Course: courseModel()
};

// mongoose models with schema definitions

function userModel() {
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        coursesAttending: {
            type: [String],
            required: true,
        }
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}

function courseModel() {

    const optionSchema = new Schema({
        caption: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
      });
      
      const questionSchema = new Schema({
        position: { type: Number, required: true },
        caption: String,
        additions: [{
          type: { type: String, enum: ['text', 'code', 'math', 'selection'], required: true },
          content: String,
        }],
        inputType: { type: String, enum: ['text', 'code', 'math', 'selection'] },
        options: [optionSchema],
        answer: {
          content: String,
        },
      });
      
      const moduleItemSchema = new Schema({
        type: { type: String, required: true, enum: ['exercise', 'codingChallenge'] },
        initialCode: { type: String },
        questions: [questionSchema],
        title: { type: String },
        description: { type: String },
      });   

        // Define the module schema that uses items
        const moduleSchema = new Schema({
            title: String,
            items: [moduleItemSchema],
        });


    const courseSchema = new Schema({
        title: { type: String, required: true },
        description: { type: String, required: true },
        publicId: { type: String, required: true },
        modules: [moduleSchema]
    }, {
        timestamps: true
    });

    courseSchema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret.hash;
        }
    });

    return mongoose.models.Course || mongoose.model('Course', courseSchema);
}
