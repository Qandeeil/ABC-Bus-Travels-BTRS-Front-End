import React from "react";
import imageTest from "./Logo/imageTest.svg";
import location from "./Logo/location.svg";
import "../../styles/Home/CardTrip.scss";
import { Trips } from "../../interfaces/global";

type Props = {
  trip: Trips;
  setTripDetails: any;
};

const CardTrip = ({ trip, setTripDetails }: Props) => {
  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);

  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return (
    <div className="cardTrip" onClick={() => setTripDetails(trip)}>
      <div className="conatinerImage">
        <img src={trip.logoTrips} alt="Rome" />
        {trip.status ? (
          <div className="status true">
            <span>Available</span>
          </div>
        ) : (
          <div className="status false">
            <span>Not Available</span>
          </div>
        )}
      </div>
      <div className="contentTrip">
        <div className="locationTrip">
          <span>{trip.tripDestination}</span>
          <span>${trip.price}</span>
        </div>
        <div className="timeTrip">
          <img src={location} />
          <span>{numDays} Days Trip</span>
        </div>
      </div>
    </div>
  );
};

export default CardTrip;
