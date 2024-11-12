import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from "../config/firebase"; // Ensure you have initialized Firebase Authentication
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'


function Profile() {
    const [name1, setName] = useState("");
    const [gender1, setGender] = useState("");
    const [height1, setHeight] = useState(0);
    const [weight1, setWeight] = useState(0);
    const [age1, setAge] = useState(0);
    const [uid, setUid] = useState(null);
    const [docExists, setDocExists] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [allergyToggle, setAllergyToggle] = useState(false);
    const [allergyInput, setAllergyInput] = useState("");
    const [allergies, setAllergies] = useState([]);
    const [chronicDiseases, setChronicDiseases] = useState([]);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/'); 
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleAllergyToggle = () => {
        setAllergyToggle(!allergyToggle);
    };

    const handleAllergyInputChange = (e) => {
        setAllergyInput(e.target.value);
    };

    const handleAddAllergy = async () => {
        if (allergyInput.trim()) {
            const updatedAllergies = [...allergies, allergyInput.trim()]; // Create the updated list here
            setAllergies(updatedAllergies);
            setAllergyInput("");
            setAllergyToggle(false);
    
            try {
                const userDocRef = doc(db, "Demographics", uid);
                const userDoc = await getDoc(userDocRef);
    
                const data = {
                    Allergies: updatedAllergies // Use the updated list here
                };
    
                if (userDoc.exists()) {
                    await setDoc(userDocRef, data, { merge: true }); // Merge updates existing fields without overwriting the entire document
                    toast.success("Details updated successfully!");
                } else {
                    await setDoc(userDocRef, data);
                    toast.success("Details submitted successfully!");
                }
            } catch (error) {
                console.log(error);
                toast.error("An error occurred while submitting your details.");
            }
        }
    };

    const handleAddChronicDisease = async (disease) => {
        const updatedChronicDiseases = [...chronicDiseases, disease]; // Create the updated list here
        setChronicDiseases(updatedChronicDiseases);
        setDropdownVisible(false);
    
        try {
            const userDocRef = doc(db, "Demographics", uid);
            const userDoc = await getDoc(userDocRef);
    
            const data = {
                ChronicDiseases: updatedChronicDiseases // Use the updated list here
            };
    
            if (userDoc.exists()) {
                await setDoc(userDocRef, data, { merge: true }); // Merge updates existing fields without overwriting the entire document
                toast.success("Details updated successfully!");
            } else {
                await setDoc(userDocRef, data);
                toast.success("Details submitted successfully!");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while submitting your details.");
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
                checkUserDoc(user.uid);
                fetchUserDetails(user.uid);
            } else {
                setUid(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const checkUserDoc = async (userId) => {
        const userDocRef = doc(db, "Demographics", userId);
        const userDoc = await getDoc(userDocRef);
        setDocExists(userDoc.exists());
    };

    const fetchUserDetails = async (userId) => {
        try {
            const userDocRef = doc(db, "Demographics", userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const data = userDoc.data();
                setName(data.Name);
                setGender(data.Gender);
                setHeight(data.Height);
                setWeight(data.Weight);
                setAge(data.Age);
                setAllergies(data.Allergies || []);
                setChronicDiseases(data.ChronicDiseases || []);
                setDocExists(true);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while fetching your details.");
        }
    };

    const handleSubmit = async () => {
        if (!uid) {
            toast.error("You must be logged in to submit details.");
            return;
        }

        try {
            const userDocRef = doc(db, "Demographics", uid);
            const userDoc = await getDoc(userDocRef);

            const data = {
                Name: name1,
                Gender: gender1,
                Height: height1,
                Weight: weight1,
                Age: age1,
                allergies: allergies,
                ChronicDiseases: chronicDiseases
            };

            if (userDoc.exists()) {
                await setDoc(userDocRef, data, { merge: true }); // Merge updates existing fields without overwriting the entire document
                toast.success("Details updated successfully!");
            } else {
                await setDoc(userDocRef, data);
                toast.success("Details submitted successfully!");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while submitting your details.");
        }
    };

    return (
        <div className="">
            <div className='flex'>
            <div className='pt-[5vh] font-semibold text-3xl text-[#] '>Profile Details</div>
            </div>
            <div className="font-medium flex flex-col gap-2 mt-[5vh]  border px-[40vh] rounded-sm  py-[5vh] ">
                <div className="flex gap-4">
                    <label className="w-20">Name: </label>
                    <input placeholder={name1 ? name1 : "name"} className="border" aria-label="name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="flex gap-4">
                    <label className="w-20">Age: </label>
                    <input placeholder={name1 ? age1 : "age"} type='number' className="border" aria-label="name" onChange={(e) => setAge(Number(e.target.value))} />
                </div>
                <div className="flex gap-4">
                    <label className="w-20">Weight </label>
                    <input placeholder={weight1 ? weight1 : "weight(in kgs)"} className="border" type='number' aria-label="name" onChange={(e) => setWeight(Number(e.target.value))} />
                </div>
                <div className="flex gap-4">
                    <label className="w-20">Height: </label>
                    <input placeholder={height1 ? height1 : "height(in cms)"} className="border" type='number' aria-label="name" onChange={(e) => setHeight(Number(e.target.value))} />
                </div>
                <div className="flex gap-4">
                    <label className="w-20">Gender: </label>
                    <input placeholder={gender1 ? gender1 : "gender"} className="border" aria-label="name" onChange={(e) => setGender(e.target.value)} />
                </div>
                <button className="bg-black text-white mt-[5vh] w-[37vh] rounded-sm p-2 " onClick={handleSubmit}>{docExists ? "Update Details" : "Submit Details"}</button>
            </div>
            <div className='flex justify-content pt-[5vh] text-3xl gap-4 font-bold'>
                <div className=''>Chronic Diseases</div>
                <div className='flex flex-col gap-1'>
                    <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdown"
                        onClick={toggleDropdown}
                        class="text-3xl font-bold" type="button">+
                    </button>
                    <div id="dropdown" className={`z-10 ${dropdownVisible ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleAddChronicDisease('Diabetes')}>Diabetes</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleAddChronicDisease('Heart Disease')}>Heart Disease</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleAddChronicDisease('Hypertension')}>Hypertension</a>
                            </li>
                            <li>
                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleAddChronicDisease('Obesity')}>Obesity</a>
                            </li>
                        </ul>
                    </div>
                </div>

               
            </div>
            <div className='border border-gray-300 p-4 m-4'>
            <ul>
                    {chronicDiseases.map((disease, index) => (
                        <li key={index} className='text-lg'>{disease}</li>
                    ))}
                </ul>
                </div>
            <div className='flex items-center justify-content pt-[5vh] gap-4'>
                <div className='text-3xl font-bold'>Allergies</div>
                {allergyToggle ?
                    <div>
                        <input
                            placeholder='Enter Food Item'
                            value={allergyInput}
                            onChange={handleAllergyInputChange}
                            aria-label=''
                            className='bg-gray-100 px-2 rounded-lg border border-black'
                        />
                        <button onClick={handleAddAllergy} className='mx-2 font-semibold'>Add</button>
                    </div>
                    :
                    <div className='text-3xl font-bold' onClick={handleAllergyToggle}>+</div>
                }

<div>
               
            </div>
          

               
            </div>
            <div className='border border-gray-300 p-4 m-4'>
            <ul>
                    {allergies.map((allergy, index) => (
                        <li key={index} className='text-lg'>{allergy}</li>
                    ))}
                </ul>

                </div>
           
           
        </div>
    );
}

export default Profile;
