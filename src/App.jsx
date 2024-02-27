import { useState } from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import { template_list, person_list } from './data';

function App() {
  const [data, setData] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [template, setTemplate] = useState('');
  const [cerTitle, setCerTitle] = useState('');
  const [cerCourseName, setCerCourseName] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [fullDate, setFullDate] = useState('');
  const [cerDescription, setCerDescription] = useState('');
  const [language, setLanguage] = useState('th');
  const [person, setPerson] = useState([]);
  const handleChangePerson = (event) => {
    const selectedPersonId = event.target.value;
    const selectedPerson = person_list.find(
      (row) => row.id == selectedPersonId
    );
    if (selectedPerson) {
      setPerson((prevPerson) => [
        ...prevPerson,
        {
          id: parseInt(selectedPerson.id),
          email: selectedPerson.email,
        },
      ]);
    } else {
      setPerson([]);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleConvert = () => {
    const formattedData = {
      certificate_id: template,
      certificate_title: cerTitle,
      certificate_courseName: cerCourseName,
      certificate_issueDate: issueDate,
      certificate_expireDate: expireDate,
      certificate_fullDate: fullDate,
      certificate_description: cerDescription,
      certificate_language: language,
      Sign_Person: person,
      data: jsonData,
    };
    console.log(formattedData);
  };

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      const jsonData = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]]
      );
      setData(parsedData);
      setJsonData(jsonData);
    };
  };
  return (
    <div className="container mx-auto mt-5 flex items-center flex-col">
      <div className="card max-w-4xl bg-base-100 shadow-xl mb-5">
        <div className="card-body">
          <h1 className="text-center text-5xl font-bold mb-3 underline">
            E-Sign
          </h1>
          <hr />
          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className="mb-3 w-full">
              <label htmlFor="">Template</label>
              <select
                className="select select-bordered w-full"
                onChange={(e) => setTemplate(e.target.value)}
              >
                <option>-Choose Template-</option>
                {template_list.map((row) => (
                  <option key={row.id} value={row.id}>
                    {row.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 w-full">
              <label htmlFor="">Certificate Title</label>
              <input
                type="text"
                placeholder="Certificate Title..."
                className="input input-bordered w-full"
                onChange={(e) => setCerTitle(e.target.value)}
              />
            </div>
            <div className="mb-3 w-full">
              <label htmlFor="">Certificate Course Name</label>
              <input
                type="text"
                placeholder="Certificate Course Name..."
                className="input input-bordered w-full"
                onChange={(e) => setCerCourseName(e.target.value)}
              />
            </div>
            <div className="mb-3 w-full">
              <label htmlFor="">Issue Date</label>
              <input
                type="date"
                onChange={(e) => setIssueDate(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-3 w-full">
              <label htmlFor="">Expire Date</label>
              <input
                type="date"
                onChange={(e) => setExpireDate(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-3 w-full">
              <label htmlFor="">Full Date</label>
              <input
                type="text"
                placeholder="Full Date..."
                className="input input-bordered w-full"
                onChange={(e) => setFullDate(e.target.value)}
              />
            </div>
            <div className="mb-3 w-full">
              <label htmlFor="">Certificate Description</label>
              <input
                type="text"
                placeholder="Certificate Description..."
                className="input input-bordered w-full"
                onChange={(e) => setCerDescription(e.target.value)}
              />
            </div>

            <div className="mb-3 w-full">
              <label htmlFor="">Person Sign 1</label>
              <select
                className="select select-bordered w-full"
                onChange={handleChangePerson}
              >
                <option>-Choose Person Sign 1-</option>
                {person_list.map((row) => (
                  <option key={row.id} value={row.id}>
                    {row.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 w-full">
              <label htmlFor="">Person Sign 2</label>
              <select
                className="select select-bordered w-full"
                onChange={handleChangePerson}
              >
                <option>-Choose Person Sign 2-</option>
                {person_list.map((row) => (
                  <option key={row.id} value={row.id}>
                    {row.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 w-full col-span-2">
              <label htmlFor="">Import File</label>
              <input
                className="file-input file-input-bordered w-full"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
              />
            </div>
            <div className="form-control mb-3 w-full">
              <label className="label cursor-pointer">
                <span className="label-text">TH</span>
                <input
                  type="radio"
                  name="lang"
                  className="radio checked:bg-blue-500"
                  value="th"
                  checked={language === 'th'}
                  onChange={handleLanguageChange}
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text">EN</span>
                <input
                  type="radio"
                  name="lang"
                  className="radio checked:bg-blue-500"
                  value="en"
                  checked={language === 'en'}
                  onChange={handleLanguageChange}
                />
              </label>
            </div>
          </div>
          <div className="mb-3 w-full">
            <button className="btn btn-accent  w-full" onClick={handleConvert}>
              Send Data
            </button>
          </div>
        </div>
      </div>
      {data.length > 0 && (
        <div className="overflow-x-auto mt-3">
          <table className="table table-zebra">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
