const OrganizationTable = ({
    organizations = [],
    onEdit,
    onDelete,
}) => {
    return (
        <table className="table table-bordered">

            <thead>

                <tr>
                    <th>#</th>
                    <th>Organization Name</th>
                    <th>Actions</th>
                </tr>

            </thead>

            <tbody>

                {organizations.length === 0 ? (
                    <tr>
                        <td
                            colSpan="3"
                            className="text-center"
                        >
                            No Organizations Found
                        </td>
                    </tr>
                ) : (
                    organizations.map((org, index) => (
                        <tr key={org._id}>

                            <td>{index + 1}</td>

                            <td>{org.name}</td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => onEdit(org)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        onDelete(org._id)
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

export default OrganizationTable;