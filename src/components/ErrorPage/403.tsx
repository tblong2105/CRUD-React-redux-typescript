import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

/**
 * Page403 component
 *
 * Version 1.0
 *
 * Date: 08-06-2021
 *
 * Copyright 
 *
 * Modification Logs:
 * DATE               AUTHOR          DESCRIPTION
 * -----------------------------------------------------------------------
 * 08-06-2021         LONGTB4           Create
 */

function Page403() {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary">
                <Link to={"/home"}>Back Home</Link>
            </Button>}
        />
    )
}

export default Page403;