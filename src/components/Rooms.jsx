import { useContext, useState } from "react";
import { ApiContext } from "../App";
import { Link } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
const Rooms = () => {
  const { rooms } = useContext(ApiContext);
  const [inputValue, setInputValue] = useState("");

  const filteredRooms = rooms?.filter(
    (room) =>
      room.title && room.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-center items-center space-x-2 bg-gray-500">
        <input
          type="text"
          className="my-5 bg-white rounded-md"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          id="search"
        />
        <label htmlFor="search">
          <SlMagnifier className="text-white text-lg font-bold" />
        </label>
      </div>
      {filteredRooms.length > 0 ? (
        filteredRooms.map(({ id, title, description, image, price }) => {
          return (
            <div key={id} className="flex p-5 space-x-5 justify-center">
              <img src={image} alt={title} width={250} height={250} />
              <div className="flex flex-col space-y-5">
                <h2>{title}</h2>
                <p>{description}</p>
                <span>${price} / Night</span>
                <Link
                  to={`/rooms/${id}`}
                  className="bg-blue-500 text-white rounded-md p-2 text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center">
          <p className="bg-red-400 text-white p-2 rounded-md mt-10">
            Aradığınız isimde odamız bulunmamaktadır
          </p>
        </div>
      )}
    </div>
  );
};
const RoomDetails = () => {
  const { id } = useParams();
  const { rooms } = useContext(ApiContext);
  const room = rooms.find((room) => room.id === id);

  return <div className="flex flex-col space-y-5">{room.title}</div>;
};

export default Rooms;
