import mongoose from 'mongoose';

const { Schema } =mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    order_data: [
        {
            type: Array,
            required: true,
        }
    ],
    orderStatus: { type: String, enum: ['Placed', 'Out for Delivery', 'Delivered'], default: 'Placed' }
}, { timestamps: true });
const OrderModel= mongoose.model('order', OrderSchema);

export default OrderModel;