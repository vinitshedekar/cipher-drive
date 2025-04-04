import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        
        return (
          <a href={item} key={i} target="_blank" rel="noopener noreferrer">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(34)}`}

              alt="new"
              crossOrigin="anonymous"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <>
      
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
      <div className="image-list">{data}</div>
    </>
  );
};
export default Display;




// import { useState } from "react";
// import "./Display.css";

// const Display = ({ contract, account }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [inputAddress, setInputAddress] = useState("");

//   const getData = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       if (!contract) throw new Error("Contract not connected");

//       const address = inputAddress || account;
//       if (!address) throw new Error("No Ethereum address provided");

//       const dataArray = await contract.display(address);

//       if (!dataArray || dataArray.length === 0) {
//         throw new Error("No images found for this address");
//       }

//       const images = dataArray.map((item, i) => {
//         // Clean up IPFS hash (remove any existing 'ipfs/' prefix)
//         const cid = item.replace(/^ipfs\//, '');
//         const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;

//         return (
//           <a
//             href={ipfsUrl}
//             key={`${cid}-${i}`}
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <img
//               src={ipfsUrl}
//               alt={`IPFS content ${i}`}
//               crossOrigin="anonymous"
//               className="image-item"
//               onError={(e) => {
//                 e.target.style.display = 'none';
//               }}
//             />
//           </a>
//         );
//       });

//       setData(images);

//     } catch (e) {
//       setError(e.message);
//       console.error("Error fetching data:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="display-container">
//       <div className="input-group">
//         <input
//           type="text"
//           placeholder="Enter Address"
//           className="address"
//           value={inputAddress}
//           onChange={(e) => setInputAddress(e.target.value)}
//         />
//         <button
//           className="button"
//           onClick={getData}
//           disabled={loading || !contract}
//         >
//           {loading ? "Loading..." : "Get Data"}
//         </button>
//       </div>

//       {error && <div className="error-message">⚠️ {error}</div>}

//       <div className="image-grid">
//         {data.length > 0 ? data : <p className="empty-state">No images to display</p>}
//       </div>
//     </div>
//   );
// };

// export default Display;

