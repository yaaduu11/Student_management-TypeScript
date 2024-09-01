import mongoose, { Schema, Document } from 'mongoose';

interface IStudent extends Document {
    name: string;
    class: number;
    division: string;
    gender: string;
}

const StudentSchema: Schema = new Schema({
    name: { type: String, required: true },
    class: { type: Number, required: true },
    division: { type: String, required: true },
    gender: { type: String, required: true }
});

export default mongoose.model<IStudent>('Students', StudentSchema);
