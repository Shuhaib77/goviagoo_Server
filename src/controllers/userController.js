import Users from "../modals/userModal.js";
import { updateProfail, userProfail, ViewAddedDestination } from "../services/userService.js";

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


export const viewRoadmap=async(req,res)=>{
  const {id}=req.params
  if(!id){
    res.status(404).json({message:"user not found"})
  }
 console.log(id,"mnmnnmn");
 
  const data= await ViewAddedDestination(id)
  console.log(data,"dww");
  
  if(!data){
   return res.status(404).json({message:"not found your road Map"})
  }
  res.status(200).json({message:"findedd",data:data},)
  




}