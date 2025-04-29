import { Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ApiContext } from "../App";

const RoomDetails = () => {
  const { id } = useParams();
  const { rooms, customerInfo, setCustomerInfo } = useContext(ApiContext);
  const room = rooms.find((room) => room.id === parseInt(id));
  const [entryDate, setEntryDate] = useState("");
  const [quitDate, setQuitDate] = useState("");
  const [customerName, setCustomerName] = useState("");

  const calculateDateDifference = (entry, quit) => {
    const entryDateObj = new Date(entry);
    const quitDateObj = new Date(quit);
    const timeDifference = quitDateObj - entryDateObj;
    return timeDifference / (1000 * 3600 * 24);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerName.trim()) {
      alert("Lütfen adınızı ve soyadınızı giriniz");
      return;
    }

    if (!entryDate || !quitDate) {
      alert("Lütfen giriş ve çıkış tarihlerini giriniz.");
      return;
    }

    if (new Date(quitDate) <= new Date(entryDate)) {
      alert("Çıkış tarihi giriş tarihinden sonra olmalıdır.");
      return;
    }

    const time = calculateDateDifference(entryDate, quitDate);
    const price = time * room.price;
    setCustomerInfo({
      id: crypto.randomUUID(),
      name: customerName,
      entry: entryDate,
      quit: quitDate,
      time,
      price,
    });
  };
  if (!room) {
    return <div>Room not found!</div>;
  }

  const divBoxClass =
    "bg-amber-50 flex items-center justify-between p-2 w-1/2 space-x-2 border-2 border-white";

  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col space-y-5 justify-center items-center bg-amber-100 rounded-md p-7  w-full">
        <img src={room.image} alt={room.title} width={400} height={300} />
        <h1 className="font-bold">{room.title}</h1>
        <p className="text-center">{room.description}</p>
        <p className="text-center">Price: ${room.price} / Night</p>
      </div>

      <form
        className="flex flex-col items-center p-5 space-y-5 bg-amber-400 w-full"
        onSubmit={handleSubmit}
      >
        <div className={divBoxClass}>
          <label htmlFor="name">Ad Soyad</label>
          <input
            id="name"
            type="text"
            className="bg-white text-center border-amber-500 border-2 rounded-md"
            onChange={(e) => setCustomerName(e.target.value)}
            value={customerName}
            placeholder="İsim giriniz"
          />
        </div>

        <div className={divBoxClass}>
          <label htmlFor="entry">Giriş Tarihi</label>
          <input
            id="entry"
            type="date"
            onChange={(e) => setEntryDate(e.target.value)}
            value={entryDate}
            min={new Date().toLocaleDateString("en-CA")}
          />
        </div>

        <div className={divBoxClass}>
          <label htmlFor="quit">Çıkış Tarihi</label>
          <input
            id="quit"
            type="date"
            onChange={(e) => setQuitDate(e.target.value)}
            value={quitDate}
            min={entryDate}
          />
        </div>
        <button className="bg-amber-50 p-2 cursor-pointer" type="submit">
          Submit
        </button>
      </form>

      <div className="bg-gray-200 w-full flex flex-col items-center space-y-3 p-5">
        <h3 className="font-bold ">Tatil Detayı</h3>
        <p>Ad Soyad : {customerInfo.name}</p>
        <p>Giriş Tarihi : {customerInfo.entry}</p>
        <p>Çıkış Tarihi : {customerInfo.quit}</p>
        <p>Toplam Ücret : ${customerInfo.price}</p>
      </div>
      <div className="flex justify-center items-center py-4 bg-amber-400 w-full  ">
        {" "}
        <Link to="/" className="bg-gray-500 p-2 rounded-full text-white">
          Return HomePage
        </Link>
      </div>
    </div>
  );
};

export default RoomDetails;
