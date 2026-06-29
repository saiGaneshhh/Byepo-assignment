import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FeatureForm from "../components/FeatureForm";
import FeatureTable from "../components/FeatureTable";

import {
    getFeatures,
    createFeature,
    updateFeature,
    deleteFeature,
} from "../services/featureService";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [features, setFeatures] = useState([]);
    const [editFeature, setEditFeature] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    // Load Features
    const loadFeatures = async () => {
        try {
            const res = await getFeatures();

            console.log("Features Response:", res);

            setFeatures(res.data || []);
        } catch (error) {
            console.log(error);
            setFeatures([]);
        }
    };

    useEffect(() => {
        loadFeatures();
    }, []);

    // Create / Update Feature
    const handleSubmit = async (data) => {
        try {
            if (editFeature) {
                await updateFeature(editFeature._id, data);
                setEditFeature(null);
            } else {
                await createFeature(data);
            }

            loadFeatures();
        } catch (error) {
            console.log(error);
        }
    };

    // Delete Feature
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this Feature?")) return;

        try {
            await deleteFeature(id);
            loadFeatures();
        } catch (error) {
            console.log(error);
        }
    };

    // Logout
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="container mt-4">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2>Organization Admin Dashboard</h2>

                    <p className="text-muted mb-0">
                        Welcome {user?.name}
                    </p>
                </div>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

            {/* Feature Form */}
            <div className="card shadow-sm mb-4">

                <div className="card-header">

                    <strong>
                        {editFeature
                            ? "Update Feature"
                            : "Create Feature"}
                    </strong>

                </div>

                <div className="card-body">

                    <FeatureForm
                        onSubmit={handleSubmit}
                        editFeature={editFeature}
                        cancelEdit={() => setEditFeature(null)}
                    />

                </div>

            </div>

            {/* Feature Table */}
            <div className="card shadow-sm">

                <div className="card-header">

                    <strong>Feature Flags</strong>

                </div>

                <div className="card-body">

                    <FeatureTable
                        features={features}
                        onEdit={setEditFeature}
                        onDelete={handleDelete}
                    />

                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;