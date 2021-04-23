import React from 'react';
import Layout from '../core/Layout';
import ApplicantsList from "./ApplicantsList";
const Admin = () => (
    <Layout>
        <h1>Admin page</h1>
        <ApplicantsList/>
    </Layout>
);

export default Admin;