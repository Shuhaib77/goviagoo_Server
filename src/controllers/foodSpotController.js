import { addSpot, foodWithId, foodwithLocation, getSpot } from "../services/foodSpotService.js";

export const addFoodSpots = async (req, res) => {
  const { name } = req.body;
  if(!name){
    res.status(404).json({message:"name is requird"})
  }
  const body = req.body;

  const data = await addSpot(name,body);

  if (!data) {
    return res.status(404).json({ message: "adding failedd" });
  }
    res.status(200).json({ message: "food spot created",data:data });
};



export const allSpot = async (req, res) => {
    const data = await getSpot();
    if (!data) {
      return res.status(404).json({ message: "foodspot fetching faild" });
    }
    res.status(200).json({ message: "foodspot fetch successed", data });
  };


export const foodById = async (req,res) => {
    const {id}= req.params
    console.log(id,"LLLLLL");
    if (!id) {
      return res.status(404).json({ message: " foodspt id not found" });
    }
    const data = await foodWithId(id);
    if (!data) {
      return res.status(404).json({ message: "foodspot fetching faild" });
    }
    res.status(200).json({ message: "foodspot fetch successed", data });
  };
  

  export const getFoodWithLocation = async (req, res) => {
    const { lat, lng } = req.params;
    console.log(lat, lng);
  
    if (!lat || !lng) {
      return res.status(404).json({ message: " error lat,lng requird" });
    }
    const data = await foodwithLocation(lat, lng);
    if (!data) {
      return res.status(404).json({ message: " foodspot not found for the place" });
    }
    res.status(200).json({ message: "foodspot finded for the place", data: data });
  };
  
  