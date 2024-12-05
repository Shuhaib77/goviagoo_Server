import Users from "../modals/userModal.js";
import { updateProfail, userProfail } from "../services/userService.js";

export const getUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json("invalid id");
  }
  const user = await userProfail(id);
  res.status(200).json({ message: "user founded", user: user });
};

export const updateUser=async(req,res)=>{
  const {id}=req.params
  if(!id){
   return res.status(404).json({message:"user not found"})
  }
  const upUser= await updateProfail(id,req.body)
  res.send(upUser)

}