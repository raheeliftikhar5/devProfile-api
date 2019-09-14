import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userame: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
const userModel = mongoose.model('user', userSchema);
export default userModel;