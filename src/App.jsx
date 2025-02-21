import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [inputJson, setInputJson] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_alphabet', label: 'Highest Alphabet' },
  ];

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputJson);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error('Invalid JSON: Must contain a "data" array');
      }

      const apiResponse = await axios.post('https://bajaj-backend-e5ky.onrender.com/bfhl', parsedData);
      setResponse(apiResponse.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input. Please check the format.');
      setResponse(null);
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    selectedOptions.forEach((option) => {
      if (option.value === 'alphabets') filteredResponse.alphabets = response.alphabets;
      if (option.value === 'numbers') filteredResponse.numbers = response.numbers;
      if (option.value === 'highest_alphabet') filteredResponse.highest_alphabet = response.highest_alphabet;
    });

    return (
      <div>
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>22BCS16960</h1> 
      <div>
        <h2>Enter JSON Input:</h2>
        <textarea
          rows="5"
          cols="50"
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
          placeholder='Example: { "data": ["A", "C", "z"] }'
        />
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div>
          <h2>Filter Response:</h2>
          <Select
            isMulti
            options={options}
            onChange={(selected) => setSelectedOptions(selected)}
            placeholder="Select filters..."
          />
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
