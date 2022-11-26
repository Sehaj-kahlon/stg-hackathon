import React, { Component } from "react";
import { useState } from "react";
import axios from "axios";
import $ from "jquery";
const Donator = () => {
  // e.preventDefault();
  const [inputs, setInputs] = useState({
    source: "",
    mapping: "",
  });
  const handleChange = (e) => {
    console.log("done");
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    console.log("done submit");
    e.preventDefault();
    try {
      const res = await axios.post("/auth/output", inputs).then(
        (response) => {
          console.log(1);
          console.log(response.data); //output as list
          console.log(2);
          document.querySelector("#target").innerText = JSON.stringify(response.data[0]); //target
          var code = response.data[1];
          console.log(code);
          document.querySelector("#map").innerText = code.toString(); //mapping
        },
        (error) => {
          console.log(error);
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  var validited = true;
  const isValidFileUploaded = (file) => {
    const validExtensions = ["csv", "json"];
    const fileExtension = file.type.split("/")[1];
    return validExtensions.includes(fileExtension);
  };
  const fileChange = (e) => {
    if (e.target.files.length < 1) {
      return;
    }
    const file = e.target.files[0];
    console.log(file);
    if (!isValidFileUploaded(file)) {
      validited = false;
      alert("Invalid file format");
    } else {
      handleChange(e);
    }
  };
  const chechValidity = (e) => {
    if (validited === false) {
      e.preventDefault();
      alert("Please Input corret file format");
    } else {
      handleSubmit(e);
      e.preventDefault();
    }
  };
  return (
    <div className="home">
      <div className="continer">
        <div className="about">
          <h2>
            FOLLOWING MODERN BANKING NEEDS, BANKING PAL is the best solution to get DATA. Get the
            BEST CODE to transform the DATA ACCORDING to your needs.
            <br />
            FOR THE DEVELOPERS BY THE DEVELOPERS.
          </h2>
          <div className="inputform">
            <form>
              <label>SOURCE FILE</label>
              <input required type="file" onChange={fileChange} name="source"></input>
              <label>MAPPING FILE</label>
              <input required type="file" onChange={fileChange} name="mapping"></input>
              <button onClick={chechValidity}>SUBMIT</button>
            </form>
          </div>
        </div>
        <div className="gallery">
          <h1>TARGET</h1>
          <div className="output" id="target">
            {/* <h1>output part</h1> */}
          </div>
          <h1>GENERATED CODE</h1>
          <div className="output" id="map">
            {/* <h1>output part</h1> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Donator;
