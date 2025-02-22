import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Select, MenuItem, Button, Input } from "@mui/material";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="flex flex-row items-center p-10">
      <h1 className="text-xl font-bold mb-4">Upload CSV File</h1>
      <Input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
      <div className="mt-4">
        <label className="block">Owner ID</label>
        <Input type="text" placeholder="Enter Name" disabled />
      </div>
      <Button onClick={() => file && navigate("/mapping", { state: { file } })} disabled={!file} className="mt-4">
        Next
      </Button>
    </div>
  );
};


const MappingPage = () => {
  const [mappings, setMappings] = useState({});
  const csvData = JSON.parse(localStorage.getItem("csvData")) || [];
  const headers = Object.keys(csvData[0] || {});
  const fields = ["ownerId", "conditionType", "vehicleType", "driverSide", "brand", "vehicleModel", 
    "trim", "modelYear", "kmDriven", "vin", "equipmentType", "equipment", "specsType", "fuelType", "bodyType",
     "dimensions", "wheelBase", "wheels", "weight", "suspension", "engineCapacityLitres", "engineCapacityCc", 
     "transmissionType", "turningRadius", "enginePower", "enginePowerUnit", "forwardGear", "reverseGear", "co2Emissions", 
     "noOfCylinder", "frontTireSize", "rearTireSize", "frontTireAndWheelSize", "rearTireAndWheelSize", 
     "driveType", "fuelConsumption", "fuelTankCapacity", "trunkCapacity", "loadingDeckDimensions", "noOfAxles",
      "wheelSize", "performancePower", "batteryCapacity", "batteryTech", "batteryLife", "batteryRange", "rangeUnit", 
      "liftingCapacity", "acceleration", "topSpeed", "torque", "dimension", "groundClearance", "tireAndWheelSize", 
      "emissionStandard", "lka", "acc", "fcw", "aeb", "ahb", "tsrs", "upholsteryType", "upholsteryColor",
       "seatingCapacity", "touchscreenDisplay", "navigationSystem", "bluetoothConnectivity", "handsFreeCalling",
        "smartphoneIntegration", "audioSystem", "cupHolders", "gloveCompartments", "doorPockets", "underSeatStorage",
       "powerWindows", "powerLocks", "powerAdjustableSideMirrors", "powerAdjustableSeats", "powerTailgate", 
       "powerSteering", "colorTone", "color", "bodyColor", "roofColor", "seatColor", "headLightsType",
       "bodyKit", "rearSpoilers", "sideSpoilers", "rearFogLamps", "frontFogLamps", "fogLights", "driverAirbags", 
      "passengerAirbags", "sideAirbags", "curtainAirbags", "rearPassengerAirbags", "driverSeatbelts", 
       "passengerSeatbelts", "rearPassengerSeatbelts", "hillStartAssist", "childLock", "doorOpenWarning", 
       "antiTheftAlarm", "speedAlert", "autoSpeedSensingDoorLock", "blindSpotMonitoring", "abs", "ebd", "eba", 
       "tcs", "tpms", "esc", "rollStabilityControl", "launchConrol", "engineImmobilizer", "stabilityControl", 
      "rolloverProtectiveStructure", "postureDesignedSeat", "seatBelt", "manualOveridePowerSteering", 
      "rearTailWorkLights", "mudguards", "ptoShield", "threePointHitch", "hydraulicPowerForHeavyLifting",
      "acHeater", "ventilatedSeats", "massageSeats", "powerSeats", "powerTrunk", "keylessEntry", "remoteStart",
       "ambientLighting", "wirelessChargingPads", "rainSensingWipers", "automaticParking", "rearViewCamera",
       "pushStartIgnition", "coverImage", "images", "location", "currency", "price", "priceInUsd", "status",
       "stock", "sku","stockType","color","quantity","date","productSku"," length"
          ,"width", "height"];

  useEffect(() => {
    setMappings(fields.reduce(
      (acc, field) => ({ ...acc, [field]: "NULL" }), {}));
  },
   []);


  const handleMappingChange = (field, value) => {
    setMappings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const finalObject = {
      products: csvData.map(row => {
        const product = Object.fromEntries(fields.map(field => [field, row[mappings[field]] || "null"]));
        product.equipment = ["ABS", "ESP"];
        product.dimension = {
          length: row[mappings["length"]] || "null",
          width: row[mappings["width"]] || "null",
          height: row[mappings["height"]] || "null"
        };
        product.stock = [
          {
            sku: row[mappings["sku"]] || "null",
            stockType: row[mappings["stockType"]] || "null",
            color: row[mappings["color"]] || "null",
            quantity: row[mappings["quantity"]] || "null",
            date: row[mappings["date"]] || "null"
          }
        ];
      product.location= [
        {
          continent: row[mappings["continent"]] || "null",
          "countries": [
            "India",
            "China",
            "Japan"
          ]
        }
      ]

        product.dimensions = {
          length: row[mappings["length"]] || "null" ,
          width: row[mappings["width"]] || "null",
          height:  row[mappings["height"]] || "null"
        };
        return product;
      })
    };
    console.log("Final Object:", JSON.stringify(finalObject, null, 2));
    // console.log(finalObject);
  };

  return (
    <Container style={{ display: "flex", flexDirection: "row", gap: "20px", backgroundColor: "brown" }}>
      <Typography variant="h6" gutterBottom>Map CSV Headers</Typography>
      <div style={{ flex: 1 }}>
        {fields.map((field) => (
          <div key={field} style={{ marginBottom: "20px" }}>
            <Typography>{field}</Typography>
            <Select value={mappings[field] || ""} onChange={(e) => handleMappingChange(field, e.target.value)} fullWidth>
              <MenuItem value="">Select a field</MenuItem>
              {headers.map((header) => (<MenuItem key={header} value={header}>{header}</MenuItem>))}
            </Select>
          </div>
        ))}
      </div>
      <Button variant="contained" onClick={handleSubmit} style={{ marginTop: "20px" }}>Submit</Button>
    </Container>
  );
};

export default MappingPage;
