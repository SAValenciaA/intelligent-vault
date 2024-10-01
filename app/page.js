'use client';
// This page is the dashboard of the app
import Image from "next/image";
import { useState } from 'react';


export default  function Home() {

  // information required by pytorch to generate the
  // neuronal network
  const [data, setData] = useState({
    password: "",
    secret: "",
    learningRate: "",
    extraNeurons: "0",
    maxEpochs: "0",
    hiddenLayers: "3",
    modelName: ""
  })

  async function handleSubmit() {
    const response = await fetch("/api/generateNN", {
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then((res) => {
        return res.text()
      })
      .then((text) => {
        return text
      })
    
    console.log(response)
  }

  function handleTextInput(event) {
    let name = event.target.name
    let value = event.target.value
    setData({
      ...data,
      [name]: value
    })
  }

  return (
    <div className='body'>
      {
        Object.keys(data).map((key, idx) => {
          return <div id="inputs">
            <input 
              key={idx}
              type="text"
              id={key + "Input"}
              name={key}
              placeholder={data[key]}
              value={data[key]}
              onChange={handleTextInput}
            />
          </div>
        })
      }
      <button onClick={handleSubmit}>Start Training</button>
    </div>
  );
}
