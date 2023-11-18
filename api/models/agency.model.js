import mongoose from "mongoose";

const agencySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    isAgency:{
      type:Boolean,
      default:true,
    },
    role:{
      type:String,
      default:'agency',
    }
  },
  { timestamps: true }
);


const Agency = mongoose.model("Agency", agencySchema);

export default Agency;
