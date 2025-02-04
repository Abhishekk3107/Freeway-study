import { useState, useEffect } from "react";
import axios from "axios";

const useSemester = (limit , page) => {
    const [semesters, setSemesters] = useState([]); // Stores the list of semesters
    const [pagination, setPagination] = useState({}); // Stores pagination details
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch all semesters
    const fetchSemesters = async () => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/api/semesters?page=${page||1}&limit=${limit||8}`);
            if (res.status === 200) {
                setSemesters(res.data.semesters);
                setPagination(res.data.pagination);
            }
        } catch (err) {
            console.error("Error fetching semesters:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add a new semester
    const addSemester = async (data) => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/api/semesters`, data);
            if (res.status === 201) {
                console.log("Semester added successfully:", res.data);
                fetchSemesters(); // Refresh semester list
            }
        } catch (err) {
            console.error("Error adding semester:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Update a semester
    const updateSemester = async (id, data) => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_BACKEND_URL}/api/semesters/${id}`, data);
            if (res.status === 200) {
                console.log("Semester updated successfully:", res.data);
                fetchSemesters(); // Refresh semester list
            }
        } catch (err) {
            console.error("Error updating semester:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete a semester
    const deleteSemester = async (id) => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_BACKEND_URL}/api/semesters/${id}`);
            if (res.status === 200) {
                console.log("Semester deleted successfully:", res.data);
                fetchSemesters(); // Refresh semester list
            }
        } catch (err) {
            console.error("Error deleting semester:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch semesters on initial render
    useEffect(() => {
        fetchSemesters();
    }, [limit , page]);

    // Return states and CRUD methods
    return {
        semesters,
        pagination,
        loading,
        error,
        fetchSemesters,
        addSemester,
        updateSemester,
        deleteSemester,
    };
};

export default useSemester;
