import { savedRoadMap, viewSaved } from "../services/desinationService.js";

export const addtoSave = async(req, res) => {
  const {rid,uid } = req.params;
  if (!uid) {
    return res.status(404).json({ message: "user not found" });
  }
  if (!rid) {
    return res.status(404).json({ message: "Road map invalid" });
  }

  const data=await savedRoadMap(rid,uid)
  if(!data){
   return res.status(404).json({message:"saving failed"})
  }
  res.status(200).json({message:"saved Successfull",savedRoad:data})
};

export const  savedViiew=async(req,res)=>{
  const {id}=req.params
  console.log(id);
  
  if(!id){
   return  res.status(404).json({message:"user not foundd"})
  }

  const data= await viewSaved(id)
  if(!data){
   return res.status(404).json("saved not findeddd")
  }
  res.status(200).json({message:"your saved roadmap finded",data:data})

}
