'use client';
// This page is the dashboard of the app
import Image from "next/image";
import { useState } from 'react';


export default  function Home() {

  // information required by pytorch to generate the
  // neuronal network
  const [generateData, setGenerationData] = useState({
    password: "",
    secret: "",
    learningRate: "",
    extraNeurons: "0",
    maxEpochs: "0",
    hiddenLayers: "3",
    modelName: ""
  })

  const [testingData, setTestingData] = useState({
    modelName: "",
    password: ""
  })

  const [testingResult, setTestingResult] = useState("")

  const [generatingNN, setGenerationNN] = useState(true)

  async function handleSubmit() {

    let url = ""
    let method = ""
    let body = ""

    if (generatingNN) {
      url = "/api/generateNN"
      body = JSON.stringify(generateData)
    } else {
      url = "/api/useNN"
      body = JSON.stringify(testingData)
    }

    const response = await fetch(url, {
      method: 'POST',
      body: body
    })
      .then((res) => {
        return res.text()
      })
      .then((text) => {
        return text
      })

    if(!generatingNN) {
      setTestingResult(response)
    }
    
  }

  function handleTextInput(event) {
    let name = event.target.name
    let value = event.target.value
    if(generatingNN) {
      setGenerationData({
        ...generateData,
        [name]: value
      })
    } else {
      setTestingData({
        ...testingData,
        [name]: value
      })

    }
  }

  return (
    <div className='body'>

      <button 
        onClick={() => setGenerationNN(true)}>
        generate neuronal network
      </button>
      <button
        onClick={() => setGenerationNN(false)}>
        use neuronal network
      </button>

      <div 
        id="generationInputs" 
        style={{
          opacity: generatingNN ? '1' : '0'
        }}
      >
        {
          Object.keys(generateData).map((key, idx) => {
            return(
                <input 
                  key={idx}
                  type="text"
                  id={key + "GenerationInputs"}
                  name={key}
                  placeholder={generateData[key]}
                  value={generateData[key]}
                  onChange={handleTextInput}
                />
            )
          })
        }
      </div>

      <div
        id="testingInputs"
        style={{
          opacity: generatingNN ? '0' : '1'
        }}
      >
        {
          Object.keys(testingData).map((key, idx) => {
            return(
                <input 
                  key={idx}
                  type="text"
                  id={key + "TestingInputs"}
                  name={key}
                  placeholder={testingData[key]}
                  value={testingData[key]}
                  onChange={handleTextInput}
                />
            )
          })
        }

        <div>{testingResult}</div>

      </div>

      <button onClick={handleSubmit}>Start Training</button>

    </div>
  );
}
