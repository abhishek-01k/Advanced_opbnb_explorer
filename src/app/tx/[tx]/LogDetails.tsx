import React from 'react';

const LogDetails = ({
    logs
}: any) => {
    console.log("Logs >>>>>>", logs);
    return (
        <div>
            <div>Transaction Receipt Event Logs</div>
        </div>
    );
};

export default LogDetails;