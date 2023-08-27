import React, { useState, useEffect } from "react";
import searchLogo from "./Logo/search.svg";
import addLogo from "./Logo/add-circle-line.svg";
import "../../styles/Home/Header.scss";
import { Account } from "../../interfaces/global";
import AddTrip from "./AddTrip";
import ChoosePicture from "./ChoosePicture";
import { newTrip } from "../../store/Trips/Trips";
import { useDispatch, useSelector } from "react-redux";
import circleYesLogo from "./Logo/Circle-Yes.svg";

type Props = {
  user: Account;
};

const Header: React.FC<Props> = ({ user }) => {
  const dispatch: any | void = useDispatch();
  const { Trips } = useSelector((state: { Trips: any }) => state);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [showAddTrip, setShowAddTrip] = useState<Boolean>(false);
  const [showMessage, setShowMessage] = useState(false);
  const [tripDestination, setTripDestination] = useState<string | null>();
  const [errorTripDestination, setErrorTripDestination] = useState<Boolean>(
    false
  );
  const [busNumber, setBusNumber] = useState<Number | null>();
  const [errorBusNumber, setErrorBusNumber] = useState<Boolean>(false);
  const [flightSupervisor, setFlightSupervisor] = useState<string | null>();
  const [errorFlightSupervisor, setErrorFlightSupervisor] = useState<Boolean>(
    false
  );
  const [price, setPrice] = useState<Number | null>();
  const [errorPrice, setErrorPrice] = useState<Boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>();
  const [errorStartDate, setErrorStartDate] = useState<Boolean>(false);
  const [endDate, setEndDate] = useState<Date | null>();
  const [errorEndDate, setErrorEndDate] = useState<Boolean>(false);
  const addTripHandler = async (e: any) => {
    e.preventDefault();
    tripDestination
      ? setErrorTripDestination(false)
      : setErrorTripDestination(true);
    busNumber ? setErrorBusNumber(false) : setErrorBusNumber(true);
    flightSupervisor
      ? setErrorFlightSupervisor(false)
      : setErrorFlightSupervisor(true);
    price ? setErrorPrice(false) : setErrorPrice(true);
    startDate ? setErrorStartDate(false) : setErrorStartDate(true);
    endDate ? setErrorEndDate(false) : setErrorEndDate(true);
    if (
      tripDestination &&
      busNumber &&
      flightSupervisor &&
      price &&
      startDate &&
      endDate &&
      selectedFile
    ) {
      const formData: any = new FormData();
      formData.append("tripDestination", tripDestination);
      formData.append("busNumber", busNumber);
      formData.append("flightSupervisor", flightSupervisor);
      formData.append("price", price);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("LogoTrips", selectedFile);

      try {
        await dispatch(newTrip(formData));
      } catch (error) {
        console.error("Error dispatching newTrip:", error);
      }
    } else if (
      tripDestination &&
      busNumber &&
      flightSupervisor &&
      price &&
      startDate &&
      endDate
    ) {
      const dataTrip = {
        tripDestination,
        busNumber,
        flightSupervisor,
        price,
        startDate,
        endDate,
        LogoTrips: selectedFile,
      };
      try {
        await dispatch(newTrip(dataTrip));
      } catch (error) {
        console.error("Error dispatching newTrip:", error);
      }
    }
  };
  useEffect(() => {
    if (Trips.newTrip?.result) {
      setShowAddTrip(false);
      setShowMessage(true);
      setTripDestination(null);
      setBusNumber(null);
      setFlightSupervisor(null);
      setPrice(null);
      setStartDate(null);
      setEndDate(null);
      setSelectedFile(null);

      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [Trips?.newTrip]);
  return (
    <div className="homeHeader">
      <div className="title">
        {user?.case === "admin" ? <h1>Add Trip</h1> : <h1>All Trips</h1>}
      </div>
      <div className="addTeamContainer">
        <div className="containerLogoSearch">
          <img src={searchLogo} alt="searchLogo" />
        </div>
        {user?.case === "admin" ? (
          <div
            className="containerAddLogo"
            onClick={() => setShowAddTrip(true)}
          >
            <img src={addLogo} alt="addLogo" />
            <span>New Trip</span>
          </div>
        ) : null}
      </div>
      {showAddTrip && (
        <AddTrip>
          <div className="containerAddTrip">
            <div className="selectImage">
              <ChoosePicture
                setSelectedFile={setSelectedFile}
                selectedFile={selectedFile}
              />
            </div>
            <form onSubmit={addTripHandler}>
              <label
                className={
                  errorTripDestination
                    ? "inputField errorInputField"
                    : "inputField"
                }
              >
                <label>Trip Destination</label>
                <input
                  type="text"
                  placeholder="Enter your Trip Destination"
                  onChange={(e) => setTripDestination(e.target.value)}
                />
              </label>
              <label
                className={
                  errorBusNumber ? "inputField errorInputField" : "inputField"
                }
              >
                <label>Bus Number</label>
                <input
                  type="number"
                  placeholder="Enter your Bus Number"
                  onChange={(e) => setBusNumber(e.target.valueAsNumber)}
                />
              </label>
              <label
                className={
                  errorFlightSupervisor
                    ? "inputField errorInputField"
                    : "inputField"
                }
              >
                <label>Flight Supervisor</label>
                <input
                  type="text"
                  placeholder="Enter your Flight Supervisor"
                  onChange={(e) => setFlightSupervisor(e.target.value)}
                />
              </label>
              <label
                className={
                  errorPrice ? "inputField errorInputField" : "inputField"
                }
              >
                <label>Price</label>
                <input
                  type="number"
                  placeholder="Enter your Price"
                  onChange={(e) => setPrice(e.target.valueAsNumber)}
                />
              </label>
              <label
                className={
                  errorStartDate ? "inputField errorInputField" : "inputField"
                }
              >
                <label>Start Date</label>
                <input
                  type="datetime-local"
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue) {
                      const date = new Date(inputValue);
                      const hours = date.getHours();
                      const meridiem = hours >= 12 ? "PM" : "AM";
                      const formattedDate = new Date(
                        date.getTime() + (hours >= 12 ? 12 : 0) * 60 * 60 * 1000
                      );
                      setStartDate(formattedDate);
                    } else {
                      setStartDate(null);
                    }
                  }}
                />
              </label>
              <label
                className={
                  errorEndDate ? "inputField errorInputField" : "inputField"
                }
              >
                <label>End Date</label>
                <input
                  type="datetime-local"
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue) {
                      const date = new Date(inputValue);
                      const hours = date.getHours();
                      const minutes = date.getMinutes();
                      const meridiem = hours >= 12 ? "PM" : "AM";
                      const formattedHours = hours % 12 || 12;
                      const formattedDate = new Date(date);
                      formattedDate.setHours(formattedHours);
                      formattedDate.setMinutes(minutes);
                      setEndDate(formattedDate);
                    } else {
                      setEndDate(null);
                    }
                  }}
                />
              </label>
              <button onClick={addTripHandler}>Save</button>
            </form>
          </div>
        </AddTrip>
      )}
      {showMessage && (
        <div className="showMessage">
          <img src={circleYesLogo} />
          <span>The flight has been added successfully</span>
        </div>
      )}
    </div>
  );
};

export default Header;
