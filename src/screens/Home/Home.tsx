import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAccounts } from "../../store/Registration/Accounts";
import useLocalStorage from "use-local-storage";
import { Account } from "../../interfaces/global";
import "../../styles/Home/Home.scss";
import Header from "../../components/Home/Header";
import SectionLeft from "../../components/Home/SectionLeft";
import CardTrip from "../../components/Home/CardTrip";
import { getTrips } from "../../store/Trips/Trips";
import { Trips } from "../../interfaces/global";
import TripDetails from "../../components/Home/TripDetails";

interface UserData {
  _id: string;
  case: "user" | "admin";
}

const Home: React.FC = () => {
  const [dataAccount, setDataAccount] = useLocalStorage<UserData | null>(
    "DataAccount",
    null
  );
  const dispatch = useDispatch<any>();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!dataAccount) {
      window.location.href = "/Signin";
    } else {
      dispatch(getAccounts());
      dispatch(getTrips());
    }
  }, [dataAccount, dispatch]); // Include dispatch in the dependency array

  const { Accounts, Trips } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(getTrips());
  }, [
    Trips?.newTrip,
    Trips?.deleteTrip,
    Trips?.addUserFromTrip,
    Trips?.removeUserFromTrip,
    Trips?.updateTrip,
    dispatch, // Include dispatch in the dependency array
  ]);

  const user = Accounts.accounts.find(
    (user: Account) => user._id === dataAccount?._id
  );

  const [tripDetails, setTripDetails] = useState<Trips>();

  console.log(Trips.search);

  return (
    <div className="home">
      {dataAccount && (
        <div className="infoAccount">
          <SectionLeft user={user} setDataAccount={setDataAccount} />
          <div className="content">
            <Header
              user={user}
              setShowMessage={setShowMessage}
              showMessage={showMessage}
            />
            <div className="trips">
              {!tripDetails &&
                (Trips.resultSearch?.length > 0
                  ? Trips.resultSearch
                      .slice()
                      .reverse()
                      .map((trip: Trips) => (
                        <CardTrip
                          trip={trip}
                          setTripDetails={setTripDetails}
                          key={trip._id}
                        />
                      ))
                  : Trips.trips
                      .slice()
                      .reverse()
                      .map((trip: Trips) => (
                        <CardTrip
                          trip={trip}
                          setTripDetails={setTripDetails}
                          key={trip._id}
                        />
                      )))}

              {tripDetails && (
                <TripDetails
                  tripDetails={tripDetails}
                  setTripDetails={setTripDetails}
                  user={user}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
