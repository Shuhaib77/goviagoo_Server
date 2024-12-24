import Foodspot from "../modals/foodSpotModal.js";

export const addSpot = async(name,body) => {
  let foodspot = await Foodspot.findOne({
    name: name,
  });
  if (foodspot) {
    throw new Error("Foood Spot allredy exist");
  }
  foodspot = Foodspot({
    name: body.name,
    image: body.image,
    location: body.location,
    rate: body.rate,
    types:body.types,
    //   time: {
    //     type: String,
    //     require: true,
    //   },
    rating: body.rating,
    websaite: body.websaite,
  });
await foodspot.save()
return foodspot
};


export const getSpot = () => {
    const data = Foodspot.find({});
    if (!data) {
      throw new Error("Food not finded");
    }
    return data;
  };


  export const foodWithId = async (id) => {
    console.log(id);
  
    try {
      const foodSpot = await Foodspot.findOne({
      _id:id
      })
      
      console.log(foodSpot);
      if (!foodSpot) {
        throw new Error("cant get details for the stay");
      }
      return foodSpot;
  
    } catch (error) {
      throw error;
    }
  };

  export const foodwithLocation = async (lat, lng) => {
    console.log(lat, lng);
  
    try {
      const foodspot = await Foodspot.find({
        "location.latitude": lat,
        "location.longitude": lng,
      })
      // .populate({
      //   path:""
      // })
      console.log(foodspot);
      if (!foodspot) {
        throw new Error("cant find foodspot for the place");
      }
      return foodspot;
    } catch (error) {
      throw error;
    }
}

  
