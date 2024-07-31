import React, { useEffect, useState } from 'react';
import './photographerlist.css'; // Ensure your CSS styles are properly defined here
import { useNavigate } from 'react-router-dom';
const Photographers = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();
  
  const handleNavigate = (photographerId) => {
    navigate(`/photographerAllPhotos/${photographerId}`);
  };

    useEffect(() => {
        // Fetch user data from the API
        fetch('http://localhost:8000/photographers')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <br />
            <br />
            <br />
            <br />
            <div className="row">
                <div className="col-lg-3">
                    <div className="sidebar">
                        <div className="widget border-0">
                            <div className="search">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Search User"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        <div className="widget border-0">
                            <div className="widget-add">
                                <img className="img-fluid" src="images/add-banner.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="row mb-4">
                        <div className="col-12">
                            <h6 className="mb-0">Showing <span className="text-primary">{filteredUsers.length} Users</span></h6>
                        </div>
                    </div>
                    <div className="row">
                        {filteredUsers.map(user => (
                            <div className="col-sm-6 col-lg-4 mb-4" key={user.id}>
                                <div className="candidate-list candidate-grid">
                                {<div className="featured-tag">Photographer</div>} {/* Conditional rendering */}
                                    <div className="candidate-list-image">
                                        <img className="img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFH-5_P3FEF5xKoBSFRyN-HuKAZZhkgfGug&usqp=CAU" alt={user.name} />
                                    </div>
                                    <div className="candidate-list-details">
                                        <div className="candidate-list-info">
                                            <div className="candidate-list-title">
                                                <h5><a href="candidate-detail.html">{user.username}</a></h5>
                                            </div>
                                            <div className="candidate-list-option">
                                                <ul className="list-unstyled">
                                                    <li><i className="fas fa-envelope pr-1"></i> {user.email}    </li>
                                                    {user.is_photographer && <li><i className="fas fa-user pr-1"></i>       Photo Grapher</li>}
                                                    {user.is_photographer == false && <li><i className="fas fa-user pr-1"></i>       User</li>}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="candidate-list-favourite-time">
                                            <div onClick={() => handleNavigate(user.email)}>
                                            <span className="candidate-list-time order-1"><a className="candidate-list-favourite order-2"><i className="fas fa-photo-video"></i></a> {user.total_photos_uploaded} photos posted</span></div>
                                            {/* <button onClick={() => handleNavigate(user.email)}>Go to Photographer Photos</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Photographers;
