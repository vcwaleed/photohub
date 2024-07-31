import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { FaHome, FaBox, FaUser, FaCheckSquare ,FaUserEdit , FaUpload} from 'react-icons/fa';

const categoryOptions = [
    // { value: 'Agriculture', label: 'Agriculture' },
    { value: 'Ag', label: 'Agriculture' },
    { value: 'Computer', label: 'Computer' },
    { value: 'Couple', label: 'Couple' },
    { value: 'Culture', label: 'Culture' },
    { value: 'Doctor', label: 'Doctor' },
    { value: 'Family', label: 'Family' },
    { value: 'Farmer', label: 'Farmer' },
    { value: 'Festival', label: 'Festival' },
    { value: 'Food', label: 'Food' },
    { value: 'Idelogy', label: 'Idelogy' },
    { value: 'Jewelry', label: 'Jewelry' },
    { value: 'Kitchen', label: 'Kitchen' },
    { value: 'Outdoor', label: 'Outdoor' },
    { value: 'People', label: 'People' },
    { value: 'Religion', label: 'Religion' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Students', label: 'Students' },
    { value: 'Traditions', label: 'Traditions' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Wedding', label: 'Wedding' },
    { value: 'Boys', label: 'Boys' },
    { value: 'Girls', label: 'Girls' },
    { value: 'Photographer', label: 'Photographer' },
    

    
  ];




const Register = () => {

    const [fname,setFName] = useState("");
    const [file,setFile] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category
    const history = useNavigate();
    const [formErrors, setFormErrors] = useState({ fname: '', file: '', category: '' });



    console.log(history);

    const setdata = (e)=>{
        setFName(e.target.value)
    }

    const setimgfile = (e)=>{
        setFile(e.target.files[0])
    }

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption); // Update selected category state
    }

    const addUserData = async (e) => {
        e.preventDefault();

        let errors = { fname: '', file: '', category: '' };
        let formIsValid = true;

        if (!fname) {
            formIsValid = false;
            errors['fname'] = 'Please enter your name';
        }

        if (!file) {
            formIsValid = false;
            errors['file'] = 'Please select an image';
        }

        if (!selectedCategory) {
            formIsValid = false;
            errors['category'] = 'Please select a category';
        }

        setFormErrors(errors);

        if (formIsValid) {
            var formData = new FormData();
            formData.append("photo", file)
            formData.append("fname", fname);
            formData.append("category", selectedCategory.value);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const res = await axios.post("http://localhost:8000/upload", formData, config);

            if (res.data.status === 201) {
                alert('Image uploaded successfully!');
                window.location.reload();
            } else {
                console.log("error")
            }
        }
    }

    return (
        <>

<aside id="sidebar">
                <div className='adminactionsidebar-title'>
                    <div className='adminactionsidebar-brand'>
                        <FaHome className='adminactionicon_header'/> Admin Dashboard
                    </div>
                </div>

                <ul className='adminactionsidebar-list'>
                    <li className='adminactionsidebar-list-item'>
                        <a href="/admindashboard">
                            <FaBox className='adminicon'/> Dashboard
                        </a>
                    </li>
                    <li className='adminactionsidebar-list-item'>
                        <a href="/adminitemaction">
                            <FaUser className='adminactionicon'/> Products
                        </a>
                    </li>
                    <li className='adminactionsidebar-list-item'>
                        <a href="/adminalluser">
                            <FaUser className='adminactionicon'/> Register User
                        </a>
                    </li>
                    <li className='adminactionsidebar-list-item'>
                        <a href="/adminapprove">
                            <FaCheckSquare className='adminactionicon'/> Booking Approval
                        </a>
                    </li>

                    <li className='adminactionsidebar-list-item'>
                        <a href="/upload">
                            <FaUpload className='adminactionicon'/>Upload Image
                        </a>
                    </li>


                    <li className='adminsidebar-list-item'>
          <a href="/adminphotographerrequests">
            < FaUserEdit className='adminicon'/> Photographers
          </a>
        </li>



                </ul>
            </aside>




    <div className='container5 mt-3'>
      <div className='form-container'>
        <h1>Upload Your Image Here</h1>

        <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control type="text" name='fname' onChange={setdata} />
                            <span className='error'>{formErrors.fname}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Select Your Image</Form.Label>
                            <Form.Control type="file" name='photo' onChange={setimgfile} />
                            <span className='error'>{formErrors.file}</span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formCategory">
                            <Form.Label>Select Category</Form.Label>
                            <Select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                options={categoryOptions}
                            />
                            <span className='error'>{formErrors.category}</span>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={addUserData}>
                            Submit
                        </Button>
                    </Form>
      </div>
    </div>


        </>
    )
}

export default Register