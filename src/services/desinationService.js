import { populate } from "dotenv";
import tryCatch from "../middlewares/tryCatch.js";
import Destination from "../modals/destinationModel.js";
import Roadmap from "../modals/roadMapModel.js";
import Users from "../modals/userModal.js";
import Saveroadmap from "../modals/roadMapSaveModel.js";

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
  if (searchdata.length === 0) {
    throw new Error("item not found");
  }
  return searchdata;
};

//addtoroadmap
export const addedToRoadMap = async (did, uid) => {
  try {
    const destination = await Destination.findById(did);
    if (!destination) {
      throw new Error("destination not find!");
    }
    console.log(destination);

    const user = await Users.findById(uid);
    console.log(user);

    if (!user) {
      throw new Error("user not found!");
    }
    let roaddestination = await Roadmap.findOne({
      userId: user._id,
    });
    if (!roaddestination) {
      roaddestination = await Roadmap.create({
        userId: user._id,
        destinations: [],
      });
    }
    console.log(roaddestination);
    const check = await roaddestination.destinations.some(
      (item) => item.toString() == destination._id.toString()
    );
    if (check) {
      throw new Error("destination alredy in your roadmap");
    }
    roaddestination.destinations.push(destination._id);
    await roaddestination.save();
    return roaddestination;
  } catch (error) {
    console.log(error);
  }
};

//addtoroadmap with map

export const addtomapwithmap = async (uid, dname, body) => {
  try {
    console.log(dname, "ede3d");
    const user = await Users.findById(uid);
    if (!user) {
      throw new Error("User not found");
    }
    let roadmaps = await Roadmap.findOne({ userId: uid }).populate({
      path: "destinations",
    });
    if (!roadmaps) {
      const createRoadMap = await Roadmap.create({
        userId: user._id,
        destinations: [],
      });

      const destination = await Destination.create({
        image: body.image[0],
        name: dname,
        location: {
          latitude: body?.location.lat,
          longitude: body.location.lon,
        },
        description: body.description,
        category: body.type,
        rating: null,
      });
      console.log(destination, "hyhyhy");

      roadmaps.destinations.push(destination._id);
      await roadmaps.save();

      console.log(userroadmap);
      // throw new Error("roadmap not found for this user");
    }
    let names = await roadmaps.destinations.find((item) => item.name === dname);
    if (names) {
      throw new Error("destination alredy in your roadmaap");
    }
    let destination = await Destination.findOne({ name: dname });

    if (!destination) {
      destination = await Destination.create({
        image: body.image,
        name: dname,
        location: {
          latitude: body?.location.lat,
          longitude: body?.location.lon,
        },
        description: body.description,
        category: body.type,
        rating: null,
      });
    }
    let userroadmap = await Roadmap.findOne({ userId: user._id });
    roadmaps.destinations.push(destination._id);
    await roadmaps.save();
    const addedmap = user.savedRoadmaps.find(
      (item) => item.toString() === roadmaps._id.toString()
    );
    console.log(addedmap, "dkndknd");

    if (!addedmap) {
      user.savedRoadmaps.push(roadmaps._id);
      await user.save();
      console.log(userroadmap);
    }

    return roadmaps;
  } catch (error) {
    console.error("error in addtomapwithmap", error.message);
    throw error;
  }
};

export const deleteYourDestination = async (did, uid) => {
  try {
    const roadMap = await Roadmap.findOne({ userId: uid });
    if (!roadMap) {
      throw new Error("Road Map not found");
    }
    console.log(did, uid);

    const deleteditemindex = await roadMap.destinations.findIndex((item) =>
      item.equals(did)
    );
    console.log(deleteditemindex);

    if (deleteditemindex != -1) {
      roadMap.destinations.splice(deleteditemindex, 1);
      await roadMap.save();
    } else {
      throw new Error("deleting failed");
    }
    return roadMap;
  } catch (error) {
    console.log(error);
  }
};

//saveRoadmap

// export const savedRoadMap = async (rid, uid) => {
//   const user = await Users.findById(uid);
//   if (!user) {
//     throw new Error("user not found");
//   }
//   const roadmap = await Roadmap.findById(rid);
//   if (!roadmap) {
//     throw new Error("road map not found");
//   }
//   const destinations = roadmap.destinations.map((item) => item);
//   let saveRoadMaps = await Saveroadmap.create({
//     userId: user._id,
//     destinationsId: [],
//   });
//   const dd = saveRoadMaps.destinationsId.push(...destinations);
//   await saveRoadMaps.save()
//   user.savedMap.push(saveRoadMaps._id)
//   const savedRoadmapee=user.savedRoadmaps
//   // savedRoadmapee={$set:{ savedRoadmapee:[]}}
//   await Users.findByIdAndUpdate(uid,{savedRoadmaps:[]})
//   await user.save()
//   await Roadmap.findByIdAndDelete(roadmap._id)
//   return saveRoadMaps;
// };

export const savedRoadMap = async (rid, uid) => {
  const user = await Users.findById(uid);
  if (!user) {
    throw new Error("User not found");
  }

  const roadmap = await Roadmap.findById(rid);
  if (!roadmap) {
    throw new Error("Road map not found");
  }
  const destinations = roadmap.destinations;

  const saveRoadMap = await Saveroadmap.create({
    userId: user._id,
    destinationsId: destinations,
  });

  user.savedMap.push(saveRoadMap._id);

  user.savedRoadmaps = user.savedRoadmaps.filter(
    (mapId) => mapId.toString() !== rid
  );

  await user.save();
  await Roadmap.findByIdAndDelete(rid);

  return saveRoadMap;
};

export const viewSaved = async (id) => {
  console.log(id,"swsw");
   const user = await Users.findById(id).populate({
    path:"savedMap",
    populate:"destinationsId"

  });
  console.log(user);
  
  if (!user) {
    throw new error("user not foundd");
  }
  return user;
};
