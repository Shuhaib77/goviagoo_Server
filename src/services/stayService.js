import stayBooking from "../modals/bookStayModel.js";
import Stay from "../modals/stayModel.js";
import Users from "../modals/userModal.js";
import paypal from 'paypal-rest-sdk'
import dotenv from "dotenv"

dotenv.config()


paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

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
    })
    // .populate({
    //   path:""
    // })
    console.log(stay);
    if (!stay) {
      throw new Error("cant find accommdation for the place");
    }
    return stay;
  } catch (error) {
    throw error;
  }
};

export const stayWithId = async (id) => {
  console.log(id);

  try {
    const stay = await Stay.findOne({
    _id:id
    })
    
    console.log(stay);
    if (!stay) {
      throw new Error("cant get details for the stay");
    }
    return stay;

  } catch (error) {
    throw error;
  }
};


export const bookYourStay = async (uid, sid, body) => {
  const user = await Users.findById(uid);
  const stay = await Stay.findById(sid);

  if (!user || !stay) {
    throw new Error("Stay or user not found");
  }

  const { rate, roomNo, days, status, updatedAt } = body;

  let findBookings = await stayBooking.findOne({
    stay: stay._id,
    roomNo: roomNo,
    status: true,
  });
  if (findBookings) {
    throw new Error("Room already booked");
  }

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `http://localhost:3000/api/${uid}/${sid}/${rate}/success`,
      cancel_url: "http://localhost:3000/api/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: stay.name,
              sku: "001",
              price: rate,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: rate,
        },
        description: "Booking for stay accommodation",
      },
    ],
  };

  // const payment = await new Promise((resolve, reject) => {
  //   paypal.payment.create(create_payment_json, (error, payment) => {
  //     if (error) return reject(error);
  //     resolve(payment);
  //   });
  // });

  // const approvalUrl = payment.links.find((link) => link.rel === "approval_url");
  // if (!approvalUrl) {
  //   throw new Error("No approval URL found");
  // }

  const m = await new Promise((resolve, reject) => {
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.error("Error creating payment:", error);
        return reject("Payment creation failed");
      } else {
        for (let link of payment.links) {
          if (link.rel === "approval_url") {
            return resolve({ approval_url: link.href });
          }
        }
        return reject("No approval URL found");
      }
    });
  });
  
  return m;
  
};

export const executePayment = async (id, sid, rate, payerId, paymentId) => {
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: rate.toString(),
        },
      },
    ],
  };

  const payment = await new Promise((resolve, reject) => {
    paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
      if (error) return reject(error);
      resolve(payment);
    });
  });

  const user = await Users.findById(id);
  const stay = await Stay.findById(sid);

  if (!user || !stay) {
    throw new Error("User or stay not found");
  }

  const booking = new stayBooking({
    stay: stay._id,
    userId: user._id,
    status: true,
    days: payment.transactions[0].amount.total / stay.rate,
    rate,
    roomNo: payment.transactions[0].item_list.items[0].sku,
  });
  await booking.save();

  return booking;
};
