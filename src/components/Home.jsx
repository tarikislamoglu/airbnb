import { ApiContext } from "../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { rooms } = useContext(ApiContext);
  return (
    <div className="flex flex-col items-center space-y-5 bg-amber-100 pb-5 h-full ">
      <h1 className="font-bold text-center p-5 bg-gray-500 w-full text-white">
        Project : AirBnb
      </h1>
      <Link to="/rooms" className="bg-amber-600 text-amber-50 p-5 rounded-md">
        Show Rooms
      </Link>
      <div className="flex flex-wrap justify-center ">
        {rooms.map((room) => {
          return (
            <div key={room.id}>
              <img src={room.image} className="w-[250px] h-[250px]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
