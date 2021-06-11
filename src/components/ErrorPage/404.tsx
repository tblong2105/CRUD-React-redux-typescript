import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Page404 component
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

class Page404 extends React.Component {
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary">
                    <Link to={"/home"}>Back Home</Link>
                </Button>}
            />
        )
    }
}

export default Page404;