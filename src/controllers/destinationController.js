import { AwsClient } from "google-auth-library";
import Destination from "../modals/destinationModel.js";
import {
  addedToRoadMap,
  addtomapwithmap,
  createDestination,
  deleteYourDestination,
  detinationView,
  getdestinationById,
} from "../services/desinationService.js";

export const addDestination = async (req, res) => {
  const { name } = req.body;
  const newdata = await createDestination(name, req.body);

  if (!newdata) {
    return res.status(404).json("new Destinaton not created");
  }
  res
    .status(200)
    .json({ message: "destination created", destination: newdata });
};

export const getDestination = async (req, res) => {
  const destination = await detinationView();
  if (!destination) {
    return res.status(404).json({ message: "destinations invalid" });
  }
  return res
    .status(200)
    .json({ message: "destinationss viewdd", destination: destination });
};

export const destinationbyid = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!id) {
    return res.status(404).json({ message: "invalid id" });
  }
  const destination = await getdestinationById(id);
  return res
    .status(200)
    .json({ message: "finded destination", destination: destination });
};

export const destinationSearch = async (req, res) => {
  const { query } = req.query;
  console.log(query);
  const searchdata = await search(query);
  if (!searchdata) {
    res.status(404).json({ message: "search not found" });
  }
  res.status(200).json({ message: "serch finded", destination: searchdata });
};

export const addToRoadMap = async (req, res) => {
  const { did, uid } = req.params;
  console.log(did);
  console.log(uid);

  if (!did) {
    return res.status(404).json({ message: "destination id invalid" });
  }
  if (!uid) {
    return res.status(404).json({ message: "user id Invalid" });
  }
  const result = await addedToRoadMap(did, uid);
  if (!result) {
    return res
      .status(404)
      .json({ message: "destination alredy in your roadMap" });
  }
  res
    .status(200)
    .json({ message: "deatination added to roadmap", destinations: result });
};

export const addwithmap = async (req, res) => {
  const body = req.body;
  const { uid, dname } = req.params;

  if (!dname) {
    return res.status(404).json({ message: "destination not found" });
  }
  if (!uid) {
    return res.status(404).json({ message: "user id Invalid" });
  }
  const data = await addtomapwithmap(uid, dname, body);
  if (!data) {
    return res.status(200).json("neww roamap created and added destination");
  }
  res.status(200).json({ message: "created roadmap", data });
};

//delete your destination service
export const deleteRoadMap = async (req, res) => {
  const { did, uid } = req.params;
  console.log(did,uid);
  
  if (!did) {
    return res.send(404).json({ message: "destination not found" });
  }
  if (!uid) {
    return  res.send(404).json({ message: "user not found" });
  }
  const data = await deleteYourDestination(did,uid);
  if (!data) {
    return  res.status(404).json({ message: "deletion failed" });
  }
  res.status(200).json({ message: "deliton success full" ,data});
};
