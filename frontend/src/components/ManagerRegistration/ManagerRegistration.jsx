import React, { useState } from "react";
import styles from "./ManagerRegistration.module.css"; // Keep the import path as-is
import managerRegistrationValidation from "./ManagerRegistrationValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManagerRegistration() {
  console.log("Rendering managerRegistration");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    manager_nid: "",
    manager_name: "",
    manager_date_of_birth: "",
    manager_houseNo: "",
    manager_postalCode: "",
    manager_address: "",
  });

  const [errors, setErrors] = useState({
    manager_nid: "",
    manager_name: "",
    manager_date_of_birth: "",
    manager_houseNo: "",
    manager_postalCode: "",
    manager_address: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Wait until the errors are set
    const validationErrors = managerRegistrationValidation(formData);
    setErrors(validationErrors);

    console.log(validationErrors);

    // Use async/await to ensure state is updated

    // Check for specific error conditions
  if (
    validationErrors.manager_nid === "" &&
    validationErrors.manager_name === "" &&
    validationErrors.manager_date_of_birth === "" &&
    validationErrors.manager_houseNo === "" &&
    validationErrors.manager_postalCode === "" &&
    validationErrors.manager_address === "" 
  ) {
    try {
      axios
        .post("http://localhost:3001/ManagerRegistration", formData)
        .then((res) => {
          if (res.data === "manager_registration_success") {
            navigate("/");
            alert("আপনি সফলভাবে ম্যানেজার নিবন্ধন করেছেন");
          } else if (res.data === "nid_exists") {
            alert("এই এনআইডি নাম্বারটি ইতিমধ্যে ব্যবহার করা হয়েছে");
            navigate("/ManagerRegistration");
          } else {
            alert("নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
          }
        });
    } catch (error) {
      alert("ম্যানেজার নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
    }
  } else {
    // Display an error message based on the first encountered error
    const errorMessages = Object.values(validationErrors).filter((error) => error !== "");
    if (errorMessages.length > 0) {
      alert("ম্যানেজার নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
    } else {
      alert("ম্যানেজার নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
    }
  }
};

  return (
    <div className={styles.RegistrationScreen}>
      <div className={styles.managerContainer} id="managerContainer">
        <div
          className={`${styles["managerFormContainer"]} ${styles["managerSignUpContainer"]}`}
        >
          <form onSubmit={handleSubmit}>
            <h1>ম্যানেজার নিবন্ধন ফর্ম</h1>
            
            <div className={styles.managerInfield}>
              <input
                type="text"
                placeholder="ম্যানেজারের নাম"
                id="manager_name"
                name="manager_name"
                value={formData.manager_name}
                onChange={handleInputChange}
              />
              {errors.manager_name && (
                <span className={styles.managerError}>{errors.manager_name}</span>
              )}
            </div>
            <div className={styles.managerInfield}>
              <input
                type="text"
                placeholder="জাতীয় পরিচয়পত্র নম্বর"
                id="manager_nid"
                name="manager_nid"
                value={formData.manager_nid}
                onChange={handleInputChange}
              />
              {errors.manager_nid && (
                <span className={styles.managerError}>{errors.manager_nid}</span>
              )}
            </div>
           
            <div className={styles.managerInfield}>
              <input
                type="text"
                placeholder="জন্ম তারিখ (YYYY-MM-DD)"
                id="manager_date_of_birth"
                name="manager_date_of_birth"
                pattern="\d{4}-\d{2}-\d{2}"
                value={formData.manager_date_of_birth}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={handleInputChange}
              />
              {errors.manager_date_of_birth && (
                <span className={styles.managerError}>
                  {errors.manager_date_of_birth}
                </span>
              )}
            </div>
            <div className={styles.managerInfield}>
              <input
                type="text"
                placeholder="বর্তমান ঠিকানা : বাড়ি নং"
                name="manager_houseNo"
                id="manager_houseNo"
                value={formData.manager_houseNo}
                onChange={handleInputChange}
              />
              {errors.manager_houseNo && (
                <span className={styles.managerError}>
                  {errors.manager_houseNo}
                </span>
              )}
            </div>
            <div className={styles.managerInfield}>
              <input
                type="text"
                placeholder="বর্তমান ঠিকানা : পোস্টাল কোড"
                id="manager_postalCode"
                name="manager_postalCode"
                value={formData.manager_postalCode}
                onChange={handleInputChange}
              />
              {errors.manager_postalCode && (
                <span className={styles.managerError}>
                  {errors.manager_postalCode}
                </span>
              )}
            </div>
            <div className={styles.managerInfield}>
  <select
    id="manager_address"
    name="manager_address"
    value={formData.manager_address}
    onChange={handleInputChange}
  >
    <option value="">বর্তমান ঠিকানা : জেলা</option>
    <option value="Dhaka">Dhaka</option>
    <option value="Chattogram">Chattogram</option>
    <option value="Sylhet">Sylhet</option>
    <option value="Khulna">Khulna</option>
    <option value="Rajshahi">Rajshahi</option>
    <option value="Barishal">Barishal</option>
    <option value="Mymensingh">Mymensingh</option>
    <option value="Khagrachari">Khagrachari</option>
    <option value="Kishoreganj">Kishoreganj</option>
    <option value="Faridpur">Faridpur</option>
    <option value="Pabna">Pabna</option>
    <option value="Magura">Magura</option>
    <option value="Munshiganj">Munshiganj</option>
    <option value="Madaripur">Madaripur</option>
    <option value="Pirojpur">Pirojpur</option>
    <option value="Jhalokathi">Jhalokathi</option>
    <option value="Bhola">Bhola</option>
    <option value="Patuakhali">Patuakhali</option>
    <option value="Barguna">Barguna</option>
    <option value="Shariatpur">Shariatpur</option>
    <option value="Narayanganj">Narayanganj</option>
    <option value="Narail">Narail</option>
    <option value="Jhenaidah">Jhenaidah</option>
    <option value="Chuadanga">Chuadanga</option>
    <option value="Meherpur">Meherpur</option>
    <option value="Gopalganj">Gopalganj</option>
    <option value="Rajbari">Rajbari</option>
    <option value="Sherpur">Sherpur</option>
    <option value="Kushtia">Kushtia</option>
    <option value="Tangail">Tangail</option>
    <option value="Kurigram">Kurigram</option>
    <option value="Lalmonirhat">Lalmonirhat</option>
    <option value="Gaibandha">Gaibandha</option>
    <option value="Thakurgaon">Thakurgaon</option>
    <option value="Panchagarh">Panchagarh</option>
    <option value="Dinajpur">Dinajpur</option>
    <option value="Nilphamari">Nilphamari</option>
    <option value="Pattan">Pattan</option>
    <option value="Chapainawabganj">Chapainawabganj</option>
    <option value="Joypurhat">Joypurhat</option>
    <option value="Naogaon">Naogaon</option>
    <option value="Bogura">Bogura</option>
    <option value="Pabna">Pabna</option>
    <option value="Sirajganj">Sirajganj</option>
    <option value="Nowabganj">Nowabganj</option>
    <option value="Mymensingh">Mymensingh</option>
    <option value="Jamalpur">Jamalpur</option>
    <option value="Netrokona">Netrokona</option>
    <option value="Sherpur">Sherpur</option>
    <option value="Sunamganj">Sunamganj</option>
    <option value="Habiganj">Habiganj</option>
    <option value="Moulvibazar">Moulvibazar</option>
    <option value="Habiganj">Habiganj</option>
    <option value="Sylhet">Sylhet</option>
    <option value="Kushtia">Kushtia</option>
    <option value="Meherpur">Meherpur</option>
    <option value="Chuadanga">Chuadanga</option>
    <option value="Khulna">Khulna</option>
    <option value="Satkhira">Satkhira</option>
    <option value="Jessore">Jessore</option>
    <option value="Narail">Narail</option>
    <option value="Bagerhat">Bagerhat</option>
    <option value="Patuakhali">Patuakhali</option>
  </select>
  {errors.manager_address && (
    <span className={styles.managerError}>
      {errors.manager_address}
    </span>
  )}
</div>


            <button type="submit" className={styles.managerButton}>
              নিবন্ধন
            </button>
            <span className={styles.managerPrevReg}>
              পূর্বে রেজিস্ট্রেশন করেছেন?{" "}
              <a href="#d" className={styles.managerRegIgnore}>
                এড়িয়ে যান
              </a>
            </span>
          </form>
        </div>
        <div className={`${styles["managerOverlayContainer"]}`} id="overlayCon">
          <div className={styles.managerOverlay}>
            <div
              className={`${styles["managerOverlayPanel"]} ${styles["managerOverlayRight"]}`}
            >
              <div className={styles["managerFormImage"]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerRegistration;
