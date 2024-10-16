import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PhoneNumberInput = () => {
  const [phoneNumber, setPhoneNumber] = useState();

  return (
    <div className="w-64">
      <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
      <PhoneInput
        international
        country="US"
        value={phoneNumber}
        onChange={setPhoneNumber}
        placeholder="Enter phone number"
        className="w-full h-10 px-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default PhoneNumberInput;
