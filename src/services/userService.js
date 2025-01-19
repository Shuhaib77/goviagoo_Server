import { populate } from "dotenv";
import Users from "../modals/userModal.js";

export const userProfail = async (id) => {
  const user = await Users.findById(id);
  if (!user) {
    throw new Error("user not found");
  }
  return user;
};

export const updateProfail = async (id, body) => {
  const upUser = await Users.findByIdAndUpdate(id, body, {
    new: true,
  });
  if (!upUser) {
    throw new Error("user not found");
  }
  return upUser;
};

// --------------
export const ViewAddedDestination = async (uid) => {
  console.log(uid,"lllll");
    
  let user = await Users.findById(uid).populate({
    path: "savedRoadmaps",
    populate:{
      path:"destinations"
    }
  });
  
  console.log( user.savedRoadmaps,"jejdjd");
  
  const stat=user.savedRoadmaps.find((item)=>item.status===false)
  console.log(stat,"gdgd");
  
  
  if (stat ) {
    return stat;

  }
  throw new Error("user not found!!");
  
};
