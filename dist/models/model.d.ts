import mongoose, { Document } from 'mongoose';
interface IStudent extends Document {
    name: string;
    class: number;
    division: string;
    gender: string;
}
declare const _default: mongoose.Model<IStudent, {}, {}, {}, mongoose.Document<unknown, {}, IStudent> & IStudent & Required<{
    _id: unknown;
}>, any>;
export default _default;
