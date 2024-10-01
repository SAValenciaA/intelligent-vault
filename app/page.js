'use client';
// This page is the dashboard of the app
import Image from "next/image";
import { useState, useEffect } from 'react';
import './globals.css';


export default  function Home() {

  // information required by pytorch to generate the
  // neuronal network
  const [generateData, setGenerationData] = useState({
    Model_name: "",
    Password: "",
    Secret: "",
    Learning_rate: "0.0001",
    Extra_neurons: "0",
    Max_epochs: "8000",
    Hidden_layers: "3",
    Min_match: "95"
  })

  const [testingData, setTestingData] = useState({
    Model_name: "",
    Password: ""
  })

  const [testingResult, setTestingResult] = useState("")

  const [generatingNN, setGeneratingNN] = useState(true)

  const [modelsList, setModelsList] = useState([])

  async function handleRemove(model) {
    let remove = await fetch("api/removeNN",{
      method: 'POST',
      body: JSON.stringify({modelName: model})
    })
    refreshList()
  }

  async function refreshList() {
    let list = await fetch("api/listNN", {
      method: 'GET'
    })
    .then((res) => {
        return res.text()
    })
    .then((text) => {
        return text
    })
    setModelsList(list.split("\n"))
  }

  useEffect(() => {
    refreshList()
  }, [])

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
        refreshList()
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
    <div className="body">
      <div className='form'>

        <button 
          onClick={() => setGeneratingNN(true)}
          id="generateButton"
        >
          generate neuronal network
        </button>
        <button
          onClick={() => setGeneratingNN(false)}
          id="useButton"
        >
          use neuronal network
        </button>

        <div 
          id="generationInputs" 
          style={{
            opacity: generatingNN ? '1' : '0',
            zIndex: generatingNN ? 1 : -1
          }}
        >
          {
            Object.keys(generateData).map((key, idx) => {
              return(
                  <label>
                    {key.replace("_", " ")}
                    <input 
                      type={
                        key == "Password" || key == "Secret" ? 
                          "password" : "text"
                      }
                      key={idx}
                      id={key + "GenerationInputs"}
                      name={key}
                      placeholder={generateData[key]}
                      value={generateData[key]}
                      onChange={handleTextInput}
                    />
                  </label>
              )
            })
          }
        </div>

        <div
          id="testingInputs"
          style={{
            opacity: generatingNN ? '0' : '1',
            zIndex: generatingNN ? -1 : 1
          }}
        >
          {
            Object.keys(testingData).map((key, idx) => {
              return(
                <label>
                  {key.replace("_", " ")}
                  <input 
                    key={idx}
                    type={
                      key == "Password" ?
                        "password" : "text"
                    }
                    id={key + "TestingInputs"}
                    name={key}
                    placeholder={testingData[key]}
                    value={testingData[key]}
                    onChange={handleTextInput}
                  />
                </label>
              )
            })
          }
          <p className="testingResult">{testingResult}</p>

        </div>

        <button 
          className="sendButton" 
          onClick={handleSubmit}
        >
          Send
        </button>

      </div>
      <div className="modelsList">
        <button className="refreshButton"
          onClick={refreshList}>
          Refresh
        </button>

        {modelsList.slice(0,-1).map((item, idx) => {

          return(
            <div className="modelContainer">
              <div 
                className="model">
                {item.replace("_"," ")}
              </div>
              <button 
                className="removeButton"
                onClick={() => {handleRemove(item)}}>
                X
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
}
