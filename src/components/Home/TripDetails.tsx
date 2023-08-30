import React from "react";
import "../../styles/Home/TripDetails.scss";
import { Account, Trip, Trips } from "../../interfaces/global";
import Back from "./Logo/Back.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteTrip } from "../../store/Trips/Trips";

type Props = {
  tripDetails: Trips;
  setTripDetails: any;
  user: Account;
};

const TripDetails = ({ tripDetails, setTripDetails, user }: Props) => {
  const startDate: any = new Date(tripDetails.startDate);
  const endDate: any = new Date(tripDetails.endDate);

  const dispatch = useDispatch<any>();
  const { Trips } = useSelector((state): any => state);

//   console.log(Trips.deleteTrip?.result);

  const formatDate = (date: any) => {
    return date?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: any) => {
    return date?.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const getDayPeriod = (date: any) => {
    const hour = date.getHours();
    return hour < 12 ? "Morning" : "Evening";
  };

//   const deleteTripHandler = async (e: any, _id: string) => {
//     e.preventDefault();
//     dispatch(deleteTrip(_id));
//   };

  return (
    <div className="tripDetails">
      <div className="back" onClick={() => setTripDetails(null)}>
        <img src={Back} />
        <span>Back to Trips</span>
      </div>
      <div className="containerImage">
        <img src={tripDetails.logoTrips} alt="Trip Logo" />
      </div>
      <div className="contentTrip">
        <div className="tripTitle">
          <div>
            <span>Trip Destination</span>
            <span>{tripDetails.tripDestination}</span>
          </div>
          <div>
            <span>Flight Supervisor</span>
            <span>{tripDetails.flightSupervisor}</span>
          </div>
        </div>
        <div className="tripTitle">
          <div>
            <span>Bus Number</span>
            <span>{tripDetails.busNumber}</span>
          </div>
          <div>
            <span>Passengers</span>
            <span>
              {tripDetails.passengers.length} / {tripDetails.numberOfSeats}
            </span>
          </div>
        </div>
        <div className="tripTitle">
          <div>
            <span>Start Date</span>
            <span>{formatDate(startDate)}</span>
          </div>
          <div>
            <span>End Date</span>
            <span>{formatDate(endDate)}</span>
          </div>
        </div>
        <div className="tripTitle">
          <div>
            <span>Time to go</span>
            <span>
              {formatTime(startDate)} ({getDayPeriod(startDate)})
            </span>
          </div>
          <div>
            <span>Time to leave</span>
            <span>
              {formatTime(endDate)} ({getDayPeriod(endDate)})
            </span>
          </div>
        </div>
        <div
          className="tripTitle"
          style={{ display: "block", marginLeft: 0, width: "100%" }}
        >
          <div style={{ display: "block", width: "100%", borderRight: "none" }}>
            <span style={{ lineHeight: 2 }}>Description</span>
            <span style={{ marginLeft: 20 }}>{tripDetails.description}</span>
          </div>
        </div>
      </div>
      <div className="buttonTrips">
        <button>Reservation</button>
        {user.case == "admin" && (
          <>
            <button>Edit</button>
            <button onClick={() => {
                dispatch(deleteTrip(tripDetails._id))
                setTripDetails(null)
            }}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TripDetails;
