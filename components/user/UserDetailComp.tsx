import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { DecodedJWT, UserObject } from "@/utils/interface";
import { getUserDetails, updateUser } from "@/slices/userSlice";
import { uploadImage } from "@/slices/uploadSlice";
import UserUpdateComp from "./UserUpdateComp";
import { motion } from "framer-motion";
import { Reusables } from "@/utils/Reusables";
import ReusableModal from "../modal/ReusableModal";
import UpdateNotification from "./UpdateNotification";

interface IUserDetail {
  userDetail: UserObject;
  user: DecodedJWT | undefined;
  userDetailId: any;
  userUpdateMessage: string;
}

const UserDetailComp: React.FC<IUserDetail> = ({
  userDetail,
  user,
  userDetailId,
  userUpdateMessage,
}) => {
  const [profilePicture, setProfilePicture] = useState<ArrayBuffer | null>(
    null
  );
  const [updateProfile, setUpdateProfile] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState({
    name: userDetail.name,
    email: userDetail.email,
    username: userDetail.username,
    country: userDetail.country,
    sex: userDetail.sex,
    hobbies: userDetail.hobbies,
  });
  const [update, setUpdate] = useState<boolean>(false);

  const { buttonVariants, setHoverButton, hoverButton } = Reusables();

  const upload = useAppSelector((state) => state.upload);
  const dispatch = useAppDispatch();
  const baseUrl = "http://localhost:5000";

  const openUpdate = () => setUpdate(true);
  const closeUpdate = () => setUpdate(false);

  const handleUpdateProfile = () => {
    setUpdateProfile(true);
  };

  const handleCancelProfile = () => {
    setUpdateProfile(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (upload.uploadPath) {
      // Update the profile picture state if the upload is successful
      setProfilePicture(null);
    }
  }, [upload.uploadPath]);

  const submitUpdateData = async () => {
    const data = {
      id: userDetailId,
      data: {
        name: updateData.name,
        email: updateData.email,
        username: updateData.username,
        country: updateData.country,
        sex: updateData.sex,
        hobbies: updateData.hobbies,
      },
    };
    await dispatch(updateUser(data));
    setTimeout(() => {
      setUpdateProfile(false);
    }, 2000);
    setTimeout(() => {
      return dispatch(getUserDetails(userDetailId));
    }, 2000);
    openUpdate();
  };

  const handleImageClick = () => {
    // Trigger the hidden file input element
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle selected image
    const file = e.target.files?.[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = async () => {
        // reader.result contains the binary data of the selected image
        const imageData = reader.result as ArrayBuffer;
        const blob = new Blob([imageData], { type: file.type });
        const formData = new FormData();
        formData.append("profilePicture", blob, file.name);
        // Call API to upload the image data
        dispatch(uploadImage(formData));
      };
      // Read the file as binary data
      reader.readAsArrayBuffer(file);
    }
  };
  const sanitizedImage =
    userDetail.profile_picture &&
    userDetail.profile_picture !== null &&
    userDetail.profile_picture.replace(/\\/g, "/");

  const profilePictureUrl = upload.uploadPath
    ? `${baseUrl}/${upload.uploadPath}`
    : userDetail.profile_picture === null
    ? "/images/profile_avatar.jpg"
    : `${baseUrl}/${sanitizedImage}`;

  return (
    <div
      style={{
        backgroundImage: 'url("/background3.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="sm:w-1/2 w-full justify-center items-center m-auto rounded-lg shadow-lg"
    >
      <div className="shadow-xl rounded-lg py-3">
        <div className="photo-wrapper p-2">
          {userDetail.email === user?.email ? (
            upload.uploadStatus === "pending" ? (
              <svg
                className="animate-spin h-8 w-8 bg-white justify-center items-center rounded-full m-auto"
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              <Image
                className="rounded-full mx-auto cursor-pointer"
                onClick={handleImageClick}
                src={profilePictureUrl}
                width={100}
                height={100}
                alt="pic"
              />
            )
          ) : (
            <Image
              className="rounded-full mx-auto"
              src={profilePictureUrl}
              width={100}
              height={100}
              alt="pic"
            />
          )}
          <form encType="multipart/form-data">
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
              name="profilePicture"
            />
          </form>
        </div>
        <div className="p-2">
          {updateProfile ? (
            <UserUpdateComp
              name={updateData.name}
              username={updateData.username}
              email={updateData.email}
              country={updateData.country}
              sex={updateData.sex}
              hobbies={updateData.hobbies}
              handleChange={handleChange}
            />
          ) : (
            <>
              <h3 className="text-center text-xl text-white font-medium leading-8">
                {userDetail.name}
              </h3>
              <div className="text-center text-white text-sm font-semibold mt-2">
                {<p>{userDetail.username}</p>}
              </div>
              <table className="text-xs my-3">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-white font-semibold">
                      Email:
                    </td>
                    <td className="px-2 py-2 text-white">{userDetail.email}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-white font-semibold">
                      Country:
                    </td>
                    <td className="px-2 py-2 text-white">
                      {userDetail.country}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-white font-semibold">Sex:</td>
                    <td className="px-2 py-2 text-white">{userDetail.sex}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-white font-semibold">
                      Hobbies:
                    </td>
                    <td className="px-2 py-2 text-white">
                      <div className="flex px-2 py-2 text-white space-x-1">
                        {userDetail.hobbies.split(" ").map((hobby, idx) => (
                          <div key={idx}>
                            {"*"}
                            {hobby}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}

          {userDetail.email === user?.email && (
            <div className="text-center my-3 flex space-x-2 justify-center m-auto">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                onMouseEnter={() =>
                  setHoverButton(updateProfile ? "Done" : "Edit Profile")
                }
                onMouseLeave={() => setHoverButton(null)}
                onClick={
                  updateProfile
                    ? () => {
                        submitUpdateData();
                      }
                    : handleUpdateProfile
                }
                className={`bg-blue-500 p-2 rounded-lg shadow-lg sm:text-white text-white text-xs ${
                  hoverButton === `${updateProfile} ? "Done" : "Edit Profile"}`
                    ? "hover:bg-pink-500"
                    : ""
                }`}
              >
                {updateProfile ? "Done" : "Edit Profile"}
              </motion.button>
              {updateProfile && (
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  onMouseEnter={() => setHoverButton("Cancel")}
                  onMouseLeave={() => setHoverButton(null)}
                  onClick={handleCancelProfile}
                  className={`bg-blue-500 p-2 rounded-lg shadow-lg sm:text-white text-white text-xs ${
                    hoverButton === "Cancel" ? "hover:bg-pink-500" : ""
                  }`}
                >
                  Cancel
                </motion.button>
              )}
              {/* <Button
                style="py-2 justify-center w-24 items-center rounded-lg text-white px-2 text-xs bg-blue-500 hover:bg-white hover:text-black"
                text={updateProfile ? "Done" : "Edit Profile"}
                onClick={
                  updateProfile
                    ? () => {
                        submitUpdateData();
                      }
                    : handleUpdateProfile
                }
              /> */}
              {/* {updateProfile && (
                <Button
                  style="py-2 justify-center w-24 items-center rounded-lg text-white px-2 text-xs bg-red-500 hover:bg-white hover:text-black"
                  text={"Cancel"}
                  onClick={handleCancelProfile}
                />
              )} */}
            </div>
          )}
        </div>
      </div>
      <ReusableModal
        open={update}
        onClose={closeUpdate}
        deSelectGroup={() => {}}
      >
        <UpdateNotification
          closeUpdate={closeUpdate}
          text={userUpdateMessage}
        />
      </ReusableModal>
    </div>
  );
};

export default UserDetailComp;
