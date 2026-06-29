import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OrganizationForm from "../components/OrganizationForm";
import OrganizationTable from "../components/OrganizationTable";

import {
    getOrganizations,
    createOrganization,
    updateOrganization,
    deleteOrganization,
} from "../services/organizationService";

const SuperAdminDashboard = () => {
    const navigate = useNavigate();

    const [organizations, setOrganizations] = useState([]);
    const [editOrganization, setEditOrganization] = useState(null);

    const loadOrganizations = async () => {
        try {
            const res = await getOrganizations();
            setOrganizations(res.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadOrganizations();
    }, []);

    const handleSubmit = async (name) => {
        try {
            if (editOrganization) {
                await updateOrganization(editOrganization._id, { name });
                setEditOrganization(null);
            } else {
                await createOrganization({ name });
            }

            loadOrganizations();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete Organization?")) return;

        await deleteOrganization(id);
        loadOrganizations();
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2>Super Admin Dashboard</h2>
                    <p className="text-muted mb-0">
                        Welcome Super Admin
                    </p>
                </div>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

            <div className="card shadow-sm mb-4">

                <div className="card-header">
                    <strong>
                        {editOrganization
                            ? "Update Organization"
                            : "Create Organization"}
                    </strong>
                </div>

                <div className="card-body">

                    <OrganizationForm
                        onSubmit={handleSubmit}
                        editOrganization={editOrganization}
                        cancelEdit={() =>
                            setEditOrganization(null)
                        }
                    />

                </div>

            </div>

            <div className="card shadow-sm">

                <div className="card-header">
                    <strong>Organizations</strong>
                </div>

                <div className="card-body">

                    <OrganizationTable
                        organizations={organizations}
                        onEdit={setEditOrganization}
                        onDelete={handleDelete}
                    />

                </div>

            </div>

        </div>
    );
};

export default SuperAdminDashboard;