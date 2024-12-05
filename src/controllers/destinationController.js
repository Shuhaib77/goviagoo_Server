import Destination from "../modals/destinationModel.js";
import {
  createDestination,
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
  res.status(200).json({ message: "serch finded", destination: searchdata });
};
