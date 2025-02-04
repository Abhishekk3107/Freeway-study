import { useState, useEffect } from "react";
import axios from "axios";

const useSubject = (limit , page) => {
    const [subjects, setSubjects] = useState([]); // Stores the list of subjects
    const [pagination, setPagination] = useState({}); // Stores pagination details
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch all subjects
    const fetchSubjects = async () => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/api/subjects?page=${page||1}&limit=${limit||8}`);
            if (res.status === 200) {
                setSubjects(res.data.subjects);
                setPagination(res.data.pagination);
            }
        } catch (err) {
            console.error("Error fetching subjects:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add a new subject
    const addSubject = async (data) => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/api/subjects`, data);
            if (res.status === 201) {
                console.log("Subject added successfully:", res.data);
                fetchSubjects(); // Refresh subject list
            }
        } catch (err) {
            console.error("Error adding subject:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Update a subject
    const updateSubject = async (id, data) => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_BACKEND_URL}/api/subjects/${id}`, data);
            if (res.status === 200) {
                console.log("Subject updated successfully:", res.data);
                fetchSubjects(); // Refresh subject list
            }
        } catch (err) {
            console.error("Error updating subject:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete a subject
    const deleteSubject = async (id) => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_BACKEND_URL}/api/subjects/${id}`);
            if (res.status === 200) {
                console.log("Subject deleted successfully:", res.data);
                fetchSubjects(); // Refresh subject list
            }
        } catch (err) {
            console.error("Error deleting subject:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch subjects on initial render
    useEffect(() => {
        fetchSubjects();
    }, []);

    // Return states and CRUD methods
    return {
        subjects,
        pagination,
        loading,
        error,
        fetchSubjects,
        addSubject,
        updateSubject,
        deleteSubject,
    };
};

export default useSubject;
