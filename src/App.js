import "./styles.css";
import { useEffect, useState } from "react";
import fetchCities from "./cities";

// fetchCities('abc').then(console.log);

export default function App(props) {
  console.log("App");
  const [query, setQuery] = useState("ab");
  const [matched, setMatched] = useState([]);
  const [num, setNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // fetchCities(query).then((response) => {
  //   setMatched(response);
  // });

  useEffect(() => {
    let shouldRender = true;
    setIsLoading(true);
    // console.log(query);
    fetchCities(query).then((response) => {
      if (shouldRender) {
        setMatched(response);
        setIsLoading(false);
      }
    });

    return function () {
      shouldRender = false;
    };
  }, [query]);

  // useEffect(() => {
  //   fetchCities(query).then(
  //     (response) => {
  //       setMatched(response);
  //     },
  //     [query]
  //   );
  //   console.log("In effect");
  // });

  console.log("Before return");

  return (
    <div className="App">
      <input
        type="text"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <button
        onClick={() => {
          setNumber(num + 1);
        }}
      >
        Inc {num}
      </button>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <p>Length = {matched.length}</p>
          {matched.map((obj) => {
            return (
              <li>
                {obj.city} ({obj.state})
              </li>
            );
          })}
        </>
      )}
    </div>
  );
}
