import { useState, useEffect } from "react";
import axios from "axios";

const useUnit = () => {
    const [units, setUnits] = useState([]); // Stores the list of units
    const [pagination, setPagination] = useState({}); // Stores pagination details
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch all units
    const fetchUnits = async () => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/api/units`);
            if (res.status === 200) {
                setUnits(res.data.units);
                setPagination(res.data.pagination);
            }
        } catch (err) {
            console.error("Error fetching units:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add a new unit
    const addUnit = async (data) => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/api/units`, data);
            if (res.status === 201) {
                console.log("Unit added successfully:", res.data);
                fetchUnits(); // Refresh unit list
            }
        } catch (err) {
            console.error("Error adding unit:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Update a unit
    const updateUnit = async (id, data) => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_BACKEND_URL}/api/units/${id}`, data);
            if (res.status === 200) {
                console.log("Unit updated successfully:", res.data);
                fetchUnits(); // Refresh unit list
            }
        } catch (err) {
            console.error("Error updating unit:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete a unit
    const deleteUnit = async (id) => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_BACKEND_URL}/api/units/${id}`);
            if (res.status === 200) {
                console.log("Unit deleted successfully:", res.data);
                fetchUnits(); // Refresh unit list
            }
        } catch (err) {
            console.error("Error deleting unit:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch units on initial render
    useEffect(() => {
        fetchUnits();
    }, []);

    // Return states and CRUD methods
    return {
        units,
        pagination,
        loading,
        error,
        fetchUnits,
        addUnit,
        updateUnit,
        deleteUnit,
    };
};

export default useUnit;
