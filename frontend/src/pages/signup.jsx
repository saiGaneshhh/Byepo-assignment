import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Signup = () => {
    const navigate = useNavigate();

    const [organizations, setOrganizations] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        organizationId: "",
    });

    useEffect(() => {
        loadOrganizations();
    }, []);

    const loadOrganizations = async () => {
        try {
            const res = await api.get("/organizations/public");

            setOrganizations(res.data.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/admin/signup", formData);

            alert("Account Created Successfully");

            navigate("/login");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                    "Signup Failed"
            );
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-header text-center">

                            <h3>Organization Admin Signup</h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSignup}>

                                <div className="mb-3">

                                    <label>Name</label>

                                    <input
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Password</label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label>Organization</label>

                                    <select
                                        className="form-select"
                                        name="organizationId"
                                        value={formData.organizationId}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="">
                                            Select Organization
                                        </option>

                                        {organizations.map((org) => (
                                            <option
                                                key={org._id}
                                                value={org._id}
                                            >
                                                {org.name}
                                            </option>
                                        ))}

                                    </select>

                                </div>

                                <button className="btn btn-success w-100">

                                    Create Account

                                </button>

                            </form>

                            <hr />

                            <div className="text-center">

                                <Link to="/login">

                                    Already have an account?

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Signup;