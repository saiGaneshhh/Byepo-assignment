const FeatureTable = ({
    features = [],
    onEdit,
    onDelete,
}) => {

    return (

        <table className="table table-bordered">

            <thead>

                <tr>

                    <th>#</th>

                    <th>Feature Key</th>

                    <th>Status</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {features.length === 0 ? (

                    <tr>

                        <td
                            colSpan="4"
                            className="text-center"
                        >
                            No Features Found
                        </td>

                    </tr>

                ) : (

                    features.map((feature, index) => (

                        <tr key={feature._id}>

                            <td>{index + 1}</td>

                            <td>{feature.featureKey}</td>

                            <td>

                                {feature.enabled ? (
                                    <span className="badge bg-success">
                                        Enabled
                                    </span>
                                ) : (
                                    <span className="badge bg-danger">
                                        Disabled
                                    </span>
                                )}

                            </td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() =>
                                        onEdit(feature)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        onDelete(feature._id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                )}

            </tbody>

        </table>

    );

};

export default FeatureTable;