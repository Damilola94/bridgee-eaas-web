const deliveryRates = [
  {
    status: false,
    message: "Kwik cannot service this shipment."
  },
  {
    courier: {
      id: "65a14452db6dc",
      name: "Truq",
      icon: "https://delivery-staging.apiideraos.com/partners/truq.png"
    },
    amount: 7370,
    delivery_note: null,
    id: "65a14452db6dc",
    type: "Truq",
    currency: "NGN",
    status: true,
    estimated_days: "Estimated Days: 3 - 7 days",
    eta: 7
  },
  {
    courier: {
      id: "908c450c-17d7-46d7-a1e7-13f924beccc9",
      name: "Fedex",
      icon: "https://delivery-staging.apiideraos.com/partners/redstar.png"
    },
    amount: 3635,
    service_charge: 200,
    actual_amount: 1800,
    delivery_note: "This carrier will need you to print out the waybill.",
    id: "908c450c-17d7-46d7-a1e7-13f924beccc9",
    type: "Fedex",
    currency: "NGN",
    status: true,
    estimated_days: "Estimated days: 7 to 14 days \u2013 Doorstep",
    eta: 14
  },
  {
    status: false,
    redis_key: "65a14452dc57a",
    message: "Konga  cannot service this shipment."
  },
  {
    status: false,
    redis_key: "65a14452dc57c",
    message: "Konga  cannot service this shipment."
  },
  {
    courier: {
      id: "65a144506a38d",
      name: "Uber",
      icon: "https://delivery-staging.apiideraos.com/partners/Uber.png"
    },
    amount: 3100,
    delivery_note: null,
    id: "65a144506a38d",
    type: "Uber",
    currency: "NGN",
    service_charge: 450,
    status: true,
    estimated_days: "Estimated Days: Within 4 - 5 hrs",
    eta: 1
  },
  {
    status: false,
    message: "FezLtd cannot service this shipment for now."
  },
  {
    status: false,
    message: "Jumia has been turned off."
  },
  {
    status: false,
    message: "Justinnate Disabled."
  },
  {
    status: false,
    message: "Barimike Disabled."
  },
  {
    status: false,
    message: "Udyexpress Disabled."
  },
  {
    status: false,
    message: "Gokada  cannot service this shipment."
  },
  {
    courier: {
      id: "65a14450a7bb8",
      name: "Errandlr",
      icon: "https://delivery-staging.apiideraos.com/partners/errandlr.png",
      geoId: "AvPSPb2M1YhaTLuXo4oA8w=="
    },
    amount: 2650,
    delivery_note: null,
    id: "65a14450a7bb8",
    type: "Errandlr",
    currency: "NGN",
    redis_key: "AvPSPb2M1YhaTLuXo4oA8w==65a14450a7bb4",
    status: true,
    estimated_days: "Estimated Days: Next Day",
    eta: 2
  },
  {
    courier: {
      id: "65a14450a7bbf",
      name: "Errandlr Economy",
      icon: "https://delivery-staging.apiideraos.com/partners/errandlr.png",
      geoId: "AvPSPb2M1YhaTLuXo4oA8w=="
    },
    amount: 1250,
    delivery_note: null,
    id: "65a14450a7bbf",
    type: "Errandlr",
    currency: "NGN",
    redis_key: "AvPSPb2M1YhaTLuXo4oA8w==65a14450a7bb4",
    status: true,
    estimated_days: "Estimated Days:  2 - 3 Days",
    eta: 3
  },
  {
    status: false
  },
  {
    status: false,
    message: "UPS cannot service this shipment."
  },
  {
    status: false,
    message: "Patnik disabled"
  },
  {
    status: false,
    redis_key: "65a1445038435",
    message:
      "Jand2Gidi cannot service this shipment. Invalid Pickup Country - Nigeria"
  },
  {
    courier: {
      id: "928f8eac-1578-47ad-ae22-1e978d72f18f",
      name: "Tranex",
      icon: "https://delivery-staging.apiideraos.com/partners/Tranex.png"
    },
    amount: 4105,
    service_charge: 450,
    delivery_note: null,
    id: "928f8eac-1578-47ad-ae22-1e978d72f18f",
    type: "Tranex",
    origin: "LOS",
    status: true,
    destination: "LOS",
    currency: "NGN",
    estimated_days: "Estimated days: 5 - 7 days",
    eta: 7
  },
  {
    status: false,
    redis_key: "65a144503d00e",
    message: "Shiip cannot service this shipment. Invalid Pickup Country."
  },
  {
    status: false,
    message: "Undefined array key 0"
  }
];

export default deliveryRates;
