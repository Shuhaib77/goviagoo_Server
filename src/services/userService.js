import Users from "../modals/userModal.js";

export const userProfail = async (id) => {
  const user = await Users.findById(id);
  if (!user) {
    throw new Error("user not found");
  }
  return user;
};

export const updateProfail = async (id,body) => {
    const upUser = await Users.findByIdAndUpdate(id,body,{
        new:true
    });
    if (!upUser) {
      throw new Error("user not found");
    }
    return upUser;
  };
  
