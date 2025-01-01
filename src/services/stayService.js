import stayBooking from "../modals/bookStayModel.js";
import Stay from "../modals/stayModel.js";
import Users from "../modals/userModal.js";
import paypal from "paypal-rest-sdk";
import dotenv, { populate } from "dotenv";
import cron from "node-cron";
import moment from "moment";

dotenv.config();

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
    });
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
      _id: id,
    });

    console.log(stay);
    if (!stay) {
      throw new Error("cant get details for the stay");
    }
    return stay;
  } catch (error) {
    throw error;
  }
};

export const bookYourStay = async (uid, id, body) => {
  const user = await Users.findById(uid);
  const stay = await Stay.findById(id);

  if (!user || !stay) {
    throw new Error("Stay or user not found");
  }

  const { rate, roomNo, days, status, updatedAt } = body;
  console.log(rate, roomNo, days, status, updatedAt, "jdedf");

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
      return_url: `http://localhost:3000/api/staybook/${uid}/${id}/${rate}/${roomNo}/${days}/success`,
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
            console.log(link.href);
            return resolve({ approval_url: link.href });
          }
        }
        return reject("No approval URL found");
      }
    });
  });

  return m;
};

export const executePayment = async (
  uid,
  id,
  rate,
  payerId,
  paymentId,
  roomNo,
  days
) => {
  console.log(uid, id, rate, payerId, paymentId, roomNo, days);

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: rate,
        },
      },
    ],
  };

  // const payment = await new Promise((resolve, reject) => {
  //   paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
  //     if (error) return reject(error);
  //     resolve(payment);
  //   });
  // });

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async function (error, payment) {
      if (error) {
        console.error("Payment execution error:", error.response);
        return res.status(500).send("Payment execution failed");
      } else {
        // console.log("Payment success:", JSON.stringify(payment));

        // const paymentinfo = payment.payer.payer_info;
        // const transaction = payment.transactions;
        console.log(uid, id, "check");

        const user = await Users.findById(uid);
        const stay = await Stay.findById(id);

        if (!user || !stay) {
          throw new Error("User or stay not found");
        }

        const booking = new stayBooking({
          stay: stay._id,
          userId: user._id,
          status: true,
          days: days,
          rate,
          roomNo: roomNo,
        });
        await booking.save();
        user.stayBookings.push(booking._id);
        await user.save();

        cron.schedule("0 0 * * *", async () => {
          const currentdate = moment().toDate();
          const expirdBookings = await stayBooking.updateMany(
            {
              status: true,
              createdAt: {
                $lte: moment(currentdate).subtract("days", 1).toDate(),
              },
            },
            { status: false }
          );
          console.log(
            `${expirdBookings.modifiedCount} bookings updated to false`
          );
        });

        return booking;
        // return res.redirect('https://plashoe-e.vercel.app/paymentstatus');
      }
    }
  );
};

export const bookingDetails=async(id)=>{

  const user=Users.findById(id).populate({
    path:"stayBookings",
    populate:"stay"

  })
  if(!user){
    throw new Error ("stay booking not findd")
  }
  return user
  // console.log(user);
  

}
