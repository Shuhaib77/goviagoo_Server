import stayBooking from "../modals/bookStayModel.js";
import Stay from "../modals/stayModel.js";
import Users from "../modals/userModal.js";

export const createStay = async (name, body) => {
  let stay = await Stay.findOne({
    name: name,
  });
  if (stay) {
    throw new Error("this hotel alredy existt");
  }

  stay = new Stay({
    name: body.name,
    image: body.image,
    location: body.location,
    rate: body.rate,
    days: body.days,
    rating: body.rating,
    websaite: body.websaite,
    rooms: body.rooms,
  });
  await stay.save();
  return stay;
};

export const getStays = () => {
  const data = Stay.find({});
  if (!data) {
    throw new Error("stay not finded");
  }
  return data;
};

export const satywithLocation = async (lat, lng) => {
  console.log(lat, lng);

  try {
    const stay = await Stay.find({
      "location.latitude": lat,
      "location.longitude": lng,
    });
    console.log(stay);
    if (!stay) {
      throw new Error("cant find accommdation for the place");
    }
    return stay;
  } catch (error) {
    throw error;
  }
};

export const bookYourStay = async (uid, sid, body) => {
  const user = await Users.findById(uid);
  const stay = await Stay.findById(sid);
  console.log(uid,sid);

  if (!user || !stay) {
    throw new Error("stay or user Not foundd");
  }
  const { rate, roomNo, days, status, updatedAt } = body;
  const lastrate = days*rate;
  console.log(rate, roomNo, days, status, updatedAt, "ledle3dle3d");
  let findBookings = await stayBooking.findOne({
    stay: stay._id,
    roomNo: roomNo,
    status: true,
  });
  if (findBookings) {
    throw new Error("slot allredy bookeddd");
  }
  findBookings = new stayBooking({
    stay: stay._id,
    userId: user._id,
    status: status,
    days: days,
    rate: lastrate,
    roomNo: roomNo,
  });
  await findBookings.save();

  return findBookings;
};


