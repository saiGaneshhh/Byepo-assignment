import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getOrganizations,
    checkFeature,
} from "../services/checkFeatureService";

const CheckFeature = () => {

    const [organizations, setOrganizations] = useState([]);
    const [organizationId, setOrganizationId] = useState("");
    const [featureKey, setFeatureKey] = useState("");
    const [enabled, setEnabled] = useState(null);

    useEffect(() => {
        loadOrganizations();
    }, []);

    const loadOrganizations = async () => {
        try {

            const res = await getOrganizations();

            setOrganizations(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await checkFeature({
                organizationId,
                featureKey,
            });

            setEnabled(res.enabled);

        } catch (err) {
            console.log(err);
        }

    };

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Feature Flag Checker</h2>

                <Link
                    to="/login"
                    className="btn btn-primary"
                >
                    Login
                </Link>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">

                                Organization

                            </label>

                            <select
                                className="form-select"
                                value={organizationId}
                                onChange={(e)=>
                                    setOrganizationId(e.target.value)
                                }
                                required
                            >

                                <option value="">
                                    Select Organization
                                </option>

                                {organizations.map((org)=>(
                                    <option
                                        key={org._id}
                                        value={org._id}
                                    >
                                        {org.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Feature Key

                            </label>

                            <input
                                className="form-control"
                                value={featureKey}
                                onChange={(e)=>
                                    setFeatureKey(e.target.value)
                                }
                                placeholder="Example: PAYMENT_V2"
                                required
                            />

                        </div>

                        <button className="btn btn-success w-100">

                            Check Feature

                        </button>

                    </form>

                    {enabled !== null && (

                        <div className="mt-4">

                            {enabled ? (

                                <div className="alert alert-success">

                                    ✅ Feature Enabled

                                </div>

                            ) : (

                                <div className="alert alert-danger">

                                    ❌ Feature Disabled

                                </div>

                            )}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

};

export default CheckFeature;