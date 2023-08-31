import React, { useState, useEffect } from "react";
import searchLogo from "./Logo/search.svg";
import addLogo from "./Logo/add-circle-line.svg";
import "../../styles/Home/Header.scss";
import { Account } from "../../interfaces/global";
import AddTrip from "./AddTrip";
import ChoosePicture from "./ChoosePicture";
import { newTrip, resetTripFlags, search } from "../../store/Trips/Trips";
import { useDispatch, useSelector } from "react-redux";
import circleYesLogo from "./Logo/Circle-Yes.svg";
import close from "./Logo/close.svg";

type Props = {
  user: Account;
  showMessage: any;
  setShowMessage: any;
};

const Header: React.FC<Props> = ({ user, showMessage, setShowMessage }) => {
  const dispatch: any | void = useDispatch();
  const { Trips } = useSelector((state: { Trips: any }) => state);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [showAddTrip, setShowAddTrip] = useState<Boolean>(false);
  const [tripDestination, setTripDestination] = useState<string | null>();
  const [errorTripDestination, setErrorTripDestination] = useState<Boolean>(
    false
  );
  const [busNumber, setBusNumber] = useState<number>(0);
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
  const [description, setDescription] = useState<string | null>();
  const [status, setStatus] = useState<Boolean | undefined>(true);
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
      formData.append("description", description);
      formData.append("status", status);

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
        description: description,
        status,
      };
      try {
        await dispatch(newTrip(dataTrip));
      } catch (error) {
        console.error("Error dispatching newTrip:", error);
      }
    }
  };
  useEffect(() => {
    if (
      Trips?.newTrip?.result === true ||
      Trips?.deleteTrip?.result === true ||
      Trips?.addUserFromTrip?.result === true ||
      Trips?.removeUserFromTrip?.result === true
    ) {
      setShowAddTrip(false);
      setShowMessage(true);
      setTripDestination(null);
      setBusNumber(0);
      setFlightSupervisor(null);
      setPrice(null);
      setStartDate(null);
      setEndDate(null);
      setSelectedFile(null);
      setDescription(null);
  
      const timer = setTimeout(() => {
        setShowMessage(false);
        dispatch(resetTripFlags());
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [
    Trips?.newTrip?.result,
    Trips?.deleteTrip?.result,
    Trips?.addUserFromTrip?.result,
    Trips?.removeUserFromTrip?.result,
    dispatch,
    setShowMessage,
  ]);
  
  const [searchExpanded, setSearchExpanded] = useState(false);

  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded);
  };
  return (
    <div className="homeHeader">
      <div className="title">
        {user?.case === "admin" ? <h1>Add Trip</h1> : <h1>All Trips</h1>}
      </div>
      <div className="addTeamContainer">
        <div className="containerLogoSearch" onClick={toggleSearch}>
          <img src={searchLogo} alt="searchLogo" />
          {searchExpanded && (
            <input
              type="text"
              className="searchInput"
              placeholder="Search..."
              autoFocus
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => dispatch(search(e.target.value))}
            />
          )}
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
                srcImage={null}
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
                    const selectedDate = new Date(e.target.value);
                    setStartDate(selectedDate);
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
                    const selectedDate = new Date(e.target.value);
                    setEndDate(selectedDate);
                  }}
                />
              </label>

              <label
                className={
                  errorEndDate ? "inputField errorInputField" : "inputField"
                }
              >
                <label>Status</label>
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

                <label style={{ marginTop: 8 }}>Description</label>
                <textarea
                  style={{ resize: "none" }}
                  placeholder="Enter Description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </label>
              <button onClick={addTripHandler}>Save</button>
            </form>
            <div className="close" onClick={() => setShowAddTrip(false)}>
              <img src={close} alt="close"/>
            </div>
          </div>
        </AddTrip>
      )}
      {showMessage && (
        <div className="showMessage">
          <img src={circleYesLogo} alt="circleYesLogo"/>
          <span>
            {Trips?.newTrip?.result && "The flight has been added successfully"}
          </span>
          <span>
            {Trips?.deleteTrip?.result && "The flight has been deleted"}
          </span>
          <span>
            {Trips?.addUserFromTrip?.result &&
              "You have been added to this trip"}
          </span>
          <span>
            {Trips?.removeUserFromTrip?.result &&
              "You have been removed from this trip"}
          </span>
        </div>
      )}
    </div>
  );
};

export default Header;
