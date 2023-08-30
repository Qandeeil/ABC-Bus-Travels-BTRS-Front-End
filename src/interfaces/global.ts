export interface Account {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  country: string;
  profilePicture: string;
  bio: string;
  case: string;
}

export interface Trip {
  tripDestination: string,
  startDate: Date,
  endDate: Date,
  price: Number,
  busNumber: Number,
  flightSupervisor: string,
  description: string
}

export interface Trips {
  _id: string,
  tripDestination: string,
  startDate: Date,
  endDate: Date,
  price: number,
  busNumber: number,
  flightSupervisor: string,
  logoTrips: string,
  passengers: [{}],
  numberOfSeats: number,
  description: string,
  status: boolean
}