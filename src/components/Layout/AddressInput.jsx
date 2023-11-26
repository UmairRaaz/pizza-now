import React from "react";

const AddressInput = ({addressProp, setAddressProp}) => {
    let {phone, streetAddress, postalCode, city, country} = addressProp
  return (
    <>
      <input
        type="text"
        placeholder="Street Address"
        value={streetAddress}
        onChange={(e) => setAddressProp('streetAddress',e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setAddressProp('phone',e.target.value)}
      />
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setAddressProp('postalCode',e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setAddressProp('city',e.target.value)}
        />
      </div>
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setAddressProp('country',e.target.value)}
      />
    </>
  );
};

export default AddressInput;
