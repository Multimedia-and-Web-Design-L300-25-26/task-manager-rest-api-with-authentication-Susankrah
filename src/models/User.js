import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Create User schema
// Fields:
// - name (String, required)
// - email (String, required, unique)
// - password (String, required, minlength 6)
// - createdAt (default Date.now)


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true ,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
     trim: true,
  },
  password: {
    type : String,
    required: true,
    minlength: 6
  },
  }, {
  timestamps: true,

  // Students implement
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
