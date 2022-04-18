import "../App.css";
import { useEffect, useState } from "react";

export const AddStudent = () => {
  const [inputs, setinputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    gender: "",
    tenth_score: "",
    twelth_score: "",
    options: "",
  });

  const getData = (e) => {
    e.preventDefault();
    console.log(inputs);

    fetch("http://localhost:8080/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    }).then(() => {
      result();
    });
  };

  useEffect(() => {
    result();
  }, []);

  const result = async () => {
    let res = await fetch("http://localhost:8080/students");
    let data = res.json();
    console.log(data);
  };

  const handleData = (e) => {
    setinputs({ ...inputs, [e.target.className]: e.target.value });
  };

  return (
    <form className="addstudent">
      <div>
        Firstname:{" "}
        <input
          onChange={handleData}
          type="text"
          name="first_name"
          className="first_name"
          placeholder="enter first name"
        />
      </div>
      <div>
        {" "}
        Last Name:
        <input
          onChange={handleData}
          type="text"
          name="last_name"
          className="last_name"
          placeholder="enter last name"
        />
      </div>
      <div>
        {" "}
        Email:
        <input
          onChange={handleData}
          type="email"
          name="email"
          className="email"
          placeholder="enter email"
        />
      </div>

      <div>
        Gender: {/* NOTE: radio boxes only work when they have same `name`. */}
        <div>
          Male
          <input
            onChange={(e) => {
              setinputs({ ...inputs, gender: e.target.value });
            }}
            name="gender"
            className="male"
            type="radio"
            value={"male"}
          />{" "}
          Female{" "}
          <input
            onChange={(e) => {
              setinputs({ ...inputs, gender: e.target.value });
            }}
            name="gender"
            className="female"
            type="radio"
            value={"female"}
          />
        </div>
      </div>
      <div>
        Age{" "}
        <input
          onChange={handleData}
          type="number"
          name="age"
          className="age"
          placeholder="enter age"
        />
      </div>
      <div>
        Tenth Score:{" "}
        <input
          onChange={handleData}
          type="number"
          name="tenth_score"
          className="tenth_score"
          placeholder="enter 10th score"
        />{" "}
      </div>
      <div>
        Twelth Score:{" "}
        <input
          onChange={handleData}
          type="number"
          name="twelth_score"
          className="twelth_score"
          placeholder="enter 12th score"
        />{" "}
      </div>
      <div>
        <select
          onChange={(e) => {
            setinputs({ ...inputs, options: e.target.value });
          }}
          value={""} // select dropdown needs both value and onChange attributes
          name="preferred_branch"
          className="preferred_branch"
        >
          <option value="law">law</option>
          <option value="commerce">commerce</option>
          <option value="science">science</option>
          <option value="sports">sports</option>
          <option value="arts">arts</option>
          <option value="acting">acting</option>
        </select>
      </div>

      <input
        onClick={getData}
        className="submit"
        type="submit"
        value="Submit"
      />
      {
        // <div className="error"></div>
        // show this div with proper error before submitting form, if there's anything not provided
        // eg: first name missing, age cannot be greater than 100 etc
        <div className="error">
          {inputs.age > 50
            ? "Age should not be greater than 50"
            : inputs.twelth_score && inputs.tenth_score > 100
            ? "10th and 12th Score Should Not Be Greater Than 100"
            : ""}
        </div>
      }
    </form>
  );
};