import React, { useState, useEffect } from "react";
import axios from "axios"; 
import api from "../APi/Api"; 
import { Modal, Button } from "react-bootstrap"; 
import { toast } from "react-toastify";

const profile = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); 
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [editData, setEditData] = useState({ ...userData }); 

  const imgBBAPIKey = "ea67728858ffc5a28d530570bfc45b40"; 

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please log in to view your profile.");
          return;
        }
        const response = await api.get("/user/profile/update/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setImagePreview(response.data.image); 
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result); // 
      reader.readAsDataURL(file);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = userData.image;

    if (imageFile) {
      const formDataImage = new FormData();
      formDataImage.append("image", imageFile);

      try {
        setIsUploading(true);

        
        const imgBBResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgBBAPIKey}`,
          formDataImage
        );

        imageUrl = imgBBResponse.data.data.url; 

        setIsUploading(false);
      } catch (error) {
        console.error("Image upload failed:", error);
        setIsUploading(false);
        return; 
      }
    }

    const updatedData = {
      ...editData,
      image: imageUrl, 
    };

    try {
      
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to update your profile.");
        return;
      }

      
      const response = await api.put("/user/profile/update/", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile updated.");
      setUserData(updatedData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };


  const handleOpenModal = () => {
    setEditData({ ...userData }); 
    setIsModalOpen(true);
  };

  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5 py-5">
      <h4 className="bg-white-100">My Profile</h4>
      <div className="row profile-container">
        <div className="col-md-4 profile-left">
          {/* Display the image preview if available */}
          <img
            src={imagePreview || userData.image}
            alt="Profile"
            className="profile-image w-50"
          />
          <h4>Hello, {userData.first_name}</h4>
          <Button onClick={handleOpenModal} className="btn btn-primary">
            Edit Profile
          </Button>
        </div>
        <div className="col-md-8 profile-right">
          <table className="table">
            <tbody>
              <tr>
                <th>Full Name</th>
                <td>
                  {userData.first_name} {userData.last_name}
                </td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{userData.email}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>{userData.phone_number}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{userData.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for editing profile */}
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  value={editData.first_name}
                  onChange={(e) =>
                    setEditData({ ...editData, first_name: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  value={editData.last_name}
                  onChange={(e) =>
                    setEditData({ ...editData, last_name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="phone_number" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone_number"
                  value={editData.phone_number}
                  onChange={(e) =>
                    setEditData({ ...editData, phone_number: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={editData.address}
                onChange={(e) =>
                  setEditData({ ...editData, address: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Profile Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>

            <Button variant="primary" type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Save Changes"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default profile;
