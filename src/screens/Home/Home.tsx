import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAccounts } from "../../store/Registration/Accounts";
import useLocalStorage from "use-local-storage";
import { Account } from "../../interfaces/global";
import "../../styles/Home/Home.scss";
import Header from "../../components/Home/Header";
import Main from "../../components/Home/Main";
import SectionLeft from "../../components/Home/SectionLeft";
import CardTrip from "../../components/Home/CardTrip";
import { getTrips, resetTripFlags } from "../../store/Trips/Trips";
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
  const { _id } = useParams();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!dataAccount) {
      window.location.href = "/Signin";
    } else {
      dispatch(getAccounts());
      dispatch(getTrips());
    }
  }, [dataAccount]);

  const { Accounts, Trips } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(getTrips());
  }, [Trips?.newTrip, Trips?.deleteTrip]);


  const user = Accounts.accounts.find(
    (user: Account) => user._id === dataAccount?._id
  );

  const [tripDetails, setTripDetails] = useState<Trips>();

  return (
    <div className="home">
      {dataAccount && (
        <div className="infoAccount">
          <SectionLeft user={user} />
          <div className="content">
            <Header
              user={user}
              setShowMessage={setShowMessage}
              showMessage={showMessage}
            />
            <div className="trips">
              {!tripDetails &&
                Trips?.trips.map((trip: Trips) => (
                  <CardTrip
                    trip={trip}
                    setTripDetails={setTripDetails}
                    key={trip._id}
                  />
                ))}
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
      <button onClick={() => setDataAccount(null)}>Logout</button>
    </div>
  );
};

export default Home;
