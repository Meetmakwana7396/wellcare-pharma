import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import Main from "../components/common/Main";

const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [profile_pic, setprofile_pic] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    setprofile_pic(file.name);
    setProfilePic(URL.createObjectURL(file));
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleProfileUpdate = useCallback(async () => {
    setIsLoading(true);
    await axios({
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      url: `${URL}api/admin/update-details`,
      data: {
        user_name: username,
        profile_pic,
      },
    })
      .then((response) => {
      })
      .catch((error) => {
        setIsLoading(false);
      });
  });



  return (
    <Main>
      <div className="flex bg-white rounded-md p-5 w-fit mx-auto">
        <div className="justify-center max-w-sm">
          <label htmlFor="profile-pic" className="sr-only">
            Profile Picture:
          </label>
          <label
            htmlFor="profile-pic-input"
            className="w-32 h-32 rounded-full bg-gray-300 bg-black/10 flex items-center justify-center cursor-pointer mx-auto"
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile Picture"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <img
                src="/profile.png"
                alt="Profile Picture"
                className="w-full h-full rounded-full object-cover"
              />
            )}
          </label>
          <input
            type="file"
            id="profile-pic-input"
            name="profile-pic"
            className="hidden"
            onChange={handleProfilePicChange}
          />
          <br />
          <label htmlFor="username" className="sr-only">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username..."
            value={username}
            onChange={handleUsernameChange}
            className="rounded-md w-[100%] p-2 border-black/20 border-2 outline-none focus:border-primary"
          />
          <button
            className="bg-success w-[100%] text-white rounded p-2 mt-5"
            onClick={handleProfileUpdate}
          >
            {isLoading ? <Loader /> : "Update"}
          </button>
        </div>
      </div>
    </Main>
  );
};

export default Profile;
