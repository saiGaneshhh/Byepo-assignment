import { useEffect, useState } from "react";

const FeatureForm = ({
    onSubmit,
    editFeature,
    cancelEdit,
}) => {
    const [featureKey, setFeatureKey] = useState("");
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if (editFeature) {
            setFeatureKey(editFeature.featureKey);
            setEnabled(editFeature.enabled);
        } else {
            setFeatureKey("");
            setEnabled(false);
        }
    }, [editFeature]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!featureKey.trim()) return;

        onSubmit({
            featureKey,
            enabled,
        });

        setFeatureKey("");
        setEnabled(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">

                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Feature Key"
                        value={featureKey}
                        onChange={(e) =>
                            setFeatureKey(e.target.value)
                        }
                    />
                </div>

                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={enabled}
                        onChange={(e) =>
                            setEnabled(e.target.value === "true")
                        }
                    >
                        <option value={true}>Enabled</option>
                        <option value={false}>Disabled</option>
                    </select>
                </div>

                <div className="col-md-3">

                    <button className="btn btn-primary me-2">
                        {editFeature ? "Update" : "Create"}
                    </button>

                    {editFeature && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={cancelEdit}
                        >
                            Cancel
                        </button>
                    )}

                </div>

            </div>
        </form>
    );
};

export default FeatureForm;