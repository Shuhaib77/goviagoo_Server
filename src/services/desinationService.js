import Destination from "../modals/destinationModel.js";

export const createDestination = async (name, body) => {
  // const datas = await Destination.findOne({ name });
  // if (datas) {
  //   throw new Error("destination alredy exist");
  //   // return res.status(404).json("destination alredy exist");
  // }

  const newData = Destination(body);
  await newData.save();
  return newData;
};

export const detinationView = () => {
  const destination = Destination.find();
  return destination;
};

export const getdestinationById = (id) => {
  try {
    const destination = Destination.findById(id);
    if (!destination) {
      throw new Error("not find destination");
    }
    return destination;
  } catch (error) {
    throw new Error(error);
  }
};

export const search = (query) => {
  const searchdata = Destination.find({
    name: { $regex: query, $options: "i" },
  });
  if (searchdata.length===0) {
    throw new Error("item not found");
  }
  return searchdata
};
