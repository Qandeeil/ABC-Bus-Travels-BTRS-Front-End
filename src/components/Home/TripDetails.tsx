import React, { useState } from "react";
import "../../styles/Home/TripDetails.scss";
import { Account, Trip, Trips } from "../../interfaces/global";
import Back from "./Logo/Back.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserFromTrip,
  deleteTrip,
  removeUserFromTrip,
  updateTrip,
} from "../../store/Trips/Trips";
import ChoosePicture from "./ChoosePicture";

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
  const [edit, setEdit] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [tripDestination, setTripDestination] = useState<string | null>(
    tripDetails.tripDestination
  );
  const [busNumber, setBusNumber] = useState<number>(tripDetails.busNumber);
  const [flightSupervisor, setFlightSupervisor] = useState<string | null>(
    tripDetails.flightSupervisor
  );
  const [price, setPrice] = useState<Number | null>(tripDetails.price);
  const [startDateState, setStartDate] = useState<Date | null>(
    tripDetails.startDate ? new Date(tripDetails.startDate) : null
  );
  const [endDateState, setEndDate] = useState<Date | null>(
    tripDetails.endDate ? new Date(tripDetails.startDate) : null
  );
  const [description, setDescription] = useState<string>(
    tripDetails.description
  );
  const [status, setStatus] = useState<Boolean | undefined>(true);

  const [passengers, setPassengers] = useState<any>(tripDetails.passengers);

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

  const editHandler = async (e: any) => {
    e.preventDefault();
    if (selectedFile) {
      const formData: any = new FormData();
      formData.append("_id", tripDetails._id);
      formData.append("tripDestination", tripDestination);
      formData.append("busNumber", busNumber);
      formData.append("flightSupervisor", flightSupervisor);
      formData.append("price", price);
      formData.append("startDate", startDateState);
      formData.append("endDate", endDateState);
      formData.append("LogoTrips", selectedFile);
      formData.append("description", description);
      formData.append("status", status);
      try {
        await dispatch(updateTrip(formData));
        setEdit(false);

        const updatedTripDetails = {
          ...tripDetails,
          tripDestination,
          busNumber,
          flightSupervisor,
          price,
          startDate: startDateState,
          endDate: endDateState,
          description,
          logoTrips: URL.createObjectURL(selectedFile),
          passengers: passengers,
          status,
        };

        setTripDetails(updatedTripDetails);
      } catch (error) {
        console.error("Error dispatching updateTrip:", error);
      }
    } else {
      const Data = {
        _id: tripDetails._id,
        tripDestination,
        busNumber,
        flightSupervisor,
        price,
        startDate: startDateState,
        endDate: endDateState,
        description,
        logoTrips: tripDetails.logoTrips,
        status,
      };
      try {
        await dispatch(updateTrip(Data));
        setEdit(false);
        setTripDetails({
          ...tripDetails,
          tripDestination,
          busNumber,
          flightSupervisor,
          price,
          startDate: startDateState,
          endDate: endDateState,
          description,
          passengers: passengers,
          status,
        });
      } catch (error) {
        console.error("Error dispatching updateTrip:", error);
      }
    }
  };

  const addUserInTripHandler = async (e: any) => {
    e.preventDefault();
    const Data = {
      _id: tripDetails._id,
      user: { _id: user._id },
    };
    await dispatch(addUserFromTrip(Data));
    setPassengers([...passengers, user._id]);
  };

  const removeUserFromTripHandler = async (e: any) => {
    e.preventDefault();
    const Data = {
      _id: tripDetails._id,
      user: { _id: user._id },
    };
    await dispatch(removeUserFromTrip(Data));
    setPassengers(
      passengers.filter((passenger: any) => passenger !== user._id)
    );
  };
  const renderButtonReservation = () => {
    let result: any = null;
    let persResult = false;
    passengers.map((pass: any) => {
      if (pass == user._id) {
        result = (
          <button
            className="cancelReservation"
            onClick={removeUserFromTripHandler}
          >
            cancellation of reservation
          </button>
        );
        return (persResult = true);
      }
      if (!persResult) {
        result = (
          <button onClick={addUserInTripHandler}>
            Reservation ${tripDetails.price}
          </button>
        );
      }
    });
    return result;
  };

  return (
    <div className="tripDetails">
      <div className="back" onClick={() => setTripDetails(null)}>
        <img src={Back} alt="back"/>
        <span>Back to Trips</span>
      </div>
      {edit ? (
        <div className="containerImage SelectImage">
          <ChoosePicture
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            srcImage={tripDetails.logoTrips}
          />
        </div>
      ) : (
        <div className="containerImage">
          <img src={tripDetails.logoTrips} alt="Trip Logo" />
          {tripDetails?.status ? (
            <div className="status true">
              <span>Available</span>
            </div>
          ) : (
            <div className="status false">
              <span>Not Available</span>
            </div>
          )}
        </div>
      )}
      <div className="contentTrip">
        <div className="tripTitle">
          <div>
            <span>Trip Destination</span>
            {edit ? (
              <input
                type="text"
                placeholder="Enter your Trip Destination"
                onChange={(e) => setTripDestination(e.target.value)}
                value={tripDestination?.toString()}
              />
            ) : (
              <span>{tripDetails.tripDestination}</span>
            )}
          </div>
          <div>
            <span>Flight Supervisor</span>
            {edit ? (
              <input
                type="text"
                placeholder="Enter your Flight Supervisor"
                onChange={(e) => setFlightSupervisor(e.target.value)}
                value={flightSupervisor?.toString()}
              />
            ) : (
              <span>{tripDetails.flightSupervisor}</span>
            )}
          </div>
        </div>
        <div className="tripTitle">
          <div>
            <span>Bus Number</span>
            {edit ? (
              <input
                type="number"
                maxLength={5}
                placeholder="Enter your Bus Number"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d{0,5}$/.test(inputValue)) {
                    setBusNumber(parseInt(inputValue));
                  }
                }}
                value={busNumber as number | undefined}
              />
            ) : (
              <span>{tripDetails.busNumber}</span>
            )}
          </div>
          <div>
            <span>Passengers</span>
            <span>
              {passengers.length} / {tripDetails.numberOfSeats}
            </span>
          </div>
        </div>
        <div className="tripTitle">
          <div>
            <span>Start Date</span>
            {edit ? (
              <input
                type="datetime-local"
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setStartDate(selectedDate);
                }}
                value={
                  startDateState
                    ? startDateState.toISOString().slice(0, 16)
                    : ""
                }
              />
            ) : (
              <span>{formatDate(startDate)}</span>
            )}
          </div>
          <div>
            <span>End Date</span>
            {edit ? (
              <input
                type="datetime-local"
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setEndDate(selectedDate);
                }}
                value={
                  endDateState ? endDateState.toISOString().slice(0, 16) : ""
                }
              />
            ) : (
              <span>{formatDate(endDate)}</span>
            )}
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
          <div
            style={{
              display: "flex",
              width: "100%",
              borderRight: "none",
              justifyContent: "left",
            }}
          >
            <span style={{ lineHeight: 2 }}>Description</span>
            {edit ? (
              <textarea
                style={{ resize: "none" }}
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            ) : (
              <span style={{ marginLeft: 20 }}>{tripDetails.description}</span>
            )}
          </div>
        </div>
      </div>
      {!edit && (
        <div className="buttonTrips">
          {!tripDetails.status && (
            <div className="status false">
              <button disabled className="statusFalse">
                Trip is Not Available
              </button>
            </div>
          )}
          {tripDetails.status &&
            user.case == "user" &&
            passengers.length == 0 && (
              <button onClick={addUserInTripHandler}>
                Reservation ${tripDetails.price}
              </button>
            )}
          {user.case == "user" && renderButtonReservation()}
          {user.case == "admin" && (
            <>
              <button onClick={() => setEdit(true)}>Edit</button>
              <button
                onClick={() => {
                  dispatch(deleteTrip(tripDetails._id));
                  setTripDetails(null);
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
      {edit && (
        <div className="buttonTrips editButton">
          <select
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue === "Available") {
                setStatus(true);
              } else if (selectedValue === "Not available") {
                setStatus(false);
              } else {
                setStatus(undefined);
              }
            }}
            value={
              status === true
                ? "Available"
                : status === false
                ? "Not available"
                : ""
            }
          >
            <option disabled>Status</option>
            <option value="Available">Available</option>
            <option value="Not available">Not Available</option>
            <option value="" hidden></option>
          </select>
          <button onClick={editHandler}>Update</button>
          <button onClick={() => setEdit(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TripDetails;
