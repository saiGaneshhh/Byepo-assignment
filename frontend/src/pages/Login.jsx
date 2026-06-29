import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        role: "superadmin",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const endpoint =
                formData.role === "superadmin"
                    ? "/auth/super-admin/login"
                    : "/auth/admin/login";

            const response = await api.post(endpoint, {
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            if (response.data.user.role === "superadmin") {
                navigate("/super-admin/dashboard");
            } else {
                navigate("/admin/dashboard");
            }
        } catch (error) {
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);

    alert(error.response?.data?.message || "Login Failed");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-header text-center">

                            <h3>Login</h3>

                        </div>

                        <div className="card-body">

                            <form onSubmit={handleLogin}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Login As
                                    </label>

                                    <select
                                        className="form-select"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="superadmin">
                                            Super Admin
                                        </option>

                                        <option value="admin">
                                            Organization Admin
                                        </option>

                                    </select>

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

                                <div className="mb-4">

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

                                <button
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Logging In..." : "Login"}
                                </button>

                            </form>

                            <hr />

                            <div className="text-center">

                                <Link to="/signup">
                                    Create Organization Admin Account
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;