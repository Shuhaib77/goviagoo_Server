import { savedRoadMap } from "../services/desinationService.js";

export const addtoSave = async(req, res) => {
  const {rid,uid } = req.params;
  if (!uid) {
    return res.status(404).json({ message: "user not found" });
  }
  if (!rid) {
     res.status(404).json({ message: "Road map invalid" });
  }

  const data=await savedRoadMap(rid,uid)
  if(!data){
   return res.status(404).json({message:"saving failed"})
  }
  res.status(200).json({message:"saved Successfull",savedRoad:data})
};
