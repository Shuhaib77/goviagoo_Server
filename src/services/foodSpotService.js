import Foodspotbooking from "../modals/bookFoodSpotModal.js";
import Foodspot from "../modals/foodSpotModal.js";
import Users from "../modals/userModal.js";
import paypal from "paypal-rest-sdk";
import dotenv from "dotenv";
import Roadmap from "../modals/roadMapModel.js";

dotenv.config();

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

export const addSpot = async (name, body) => {
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
    types: body.types,
    //   time: {
    //     type: String,
    //     require: true,
    //   },
    rating: body.rating,
    websaite: body.websaite,
  });
  await foodspot.save();
  return foodspot;
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
      _id: id,
    });

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
    });
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
};

export const bookYourFood = async (fid, uid, body, rid) => {
  const { type, customer, rate, date } = body;

  // const [mon,year,day]=date.split("/")
  // const update=`${day}-${mon}-${day}`

  console.log(date, "gggg");

  console.log(type, customer, rate, date);
  if (!type || !customer || !rate || !date) {
    throw new Error("type,customer,rate,date field are require");
  }
  const user = await Users.findById(uid);
  const foodspot = await Foodspot.findById(fid);
  // console.log(user,foodspot);

  if (!user || !foodspot) {
    throw new Error("user or fodspot not find");
  }
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `http://localhost:3000/api/foodbook/${fid}/${uid}/${rate}/${type}/${date}/${customer}/${rid}/success`,
      cancel_url: "http://localhost:3000/api/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: foodspot.name,
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
        description: "Booking for FoodSpot accommodation",
      },
    ],
  };

  const url = await new Promise((resolve, reject) => {
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

  return url;
};

export const executePayment = async (
  fid,
  uid,
  rate,
  customer,
  date,
  type,
  payerId,
  paymentId,
  rid
) => {
  console.log(fid, uid, rate, customer, date, type, rid, "dnnj");

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
        console.log(fid, uid, "check");

        const user = await Users.findById(uid);
        const Food = await Foodspot.findById(fid);
        const RoamapData = await Roadmap.findById(rid);

        if (!user || !Food) {
          throw new Error("User or stay not found");
        }

        const FoodBooking = Foodspotbooking({
          foodSpot: Food._id,
          userId: user._id,
          status: true,
          type: type,
          date: date,
          customers: customer,
          rate: rate,
        });
        await FoodBooking.save();
        RoamapData.foodBookings.push(FoodBooking._id);
        await RoamapData.save();

        // cron.schedule("0 0 * * *", async () => {
        //   const currentdate = moment().toDate();
        //   const expirdBookings = await stayBooking.updateMany(
        //     {
        //       status: true,
        //       createdAt: {
        //         $lte: moment(currentdate).subtract("days", 1).toDate(),
        //       },
        //     },
        //     { status: false }
        //   );
        //   console.log(
        //     `${expirdBookings.modifiedCount} bookings updated to false`
        //   );
        // });

        return FoodBooking;
        // return res.redirect('https://plashoe-e.vercel.app/paymentstatus');
      }
    }
  );
};

// const check = Foodspotbooking({
//      foodSpot: {
//         type: mongoose.Schema.ObjectId,
//         ref: "Foodspot",
//       },
//       userId: {
//         type: mongoose.Schema.ObjectId,
//         ref: "Users",
//       },
//       status: {
//         type: Boolean,
//         default: false,
//         require: true,
//       },
//       type: {
//         type: String,
//         require: true,
//       },
//       date:{

//       },
//       customers: {
//         type: Number,
//         require: true,
//       },
//       rate: {
//         type: Number,
//         require: true,
//       },

//   })

export const foodBookings = async (id) => {
  const user = await Users.findById(id).populate({
    path:"savedMap",
    populate:{
      path:"roadmapId",
      populate:{
        path:"foodBookings",
        populate:"foodSpot"
      }
    }

  });
  if (!user) {
    throw new Error("food spot booking not find");
  }
  console.log(user,"eeeeee");
  
  return user;
};
