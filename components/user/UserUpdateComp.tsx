
import { UserUpdateData } from "@/utils/interface";
import React from "react";

const UserUpdateComp: React.FC<UserUpdateData> = ({
  name,
  email,
  username,
  country,
  sex,
  hobbies,
  handleChange,
}) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center m-auto space-y-3">
        <input
          className="text-black py-2 px-2 rounded-lg text-xs"
          type="text"
          value={name}
          onChange={handleChange}
          name="name"
        />
        <input
          className="text-black py-2 px-2 rounded-lg text-xs "
          type="text"
          value={username}
          onChange={handleChange}
          name="username"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex space-x-2 my-3">
          <div className="px-2 py-2 text-white w-16 font-semibold text-xs">
            Email:
          </div>
          <input
            className="text-black py-1 px-2 rounded-lg text-xs "
            type="email"
            value={email}
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="flex space-x-2 my-3">
          <div className="px-2 py-2 text-white w-16 font-semibol text-xs">
            Country:
          </div>
          <input
            className="text-black py-1 px-2 rounded-lg text-xs"
            type="text"
            value={country}
            onChange={handleChange}
            name="country"
          />
        </div>
        <div className="flex space-x-2 my-3 ">
          <div className="px-2 py-2 text-white w-16 font-semibold text-xs">Sex:</div>
            <input
              className="text-black py-1 px-2 rounded-lg text-xs"
              type="text"
              value={sex}
              onChange={handleChange}
              name="sex"
            />
        </div>
        <div className="flex space-x-2 my-3">
          <div className="px-2 py-2 text-white w-16 font-semibold text-xs">
            Hobbies:
          </div>
          <input
            className="text-black py-1 px-2 rounded-lg text-xs"
            type="text"
            value={hobbies}
            onChange={handleChange}
            name="hobbies"
          />
        </div>
      </div>
    </>
  );
};

export default UserUpdateComp;
