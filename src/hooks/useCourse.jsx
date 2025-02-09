import { useState, useEffect } from "react";
import axios from "axios";

const useCourse = (limit , page) => {
    const [courses, setCourses] = useState([]); 
    const [pagination, setPagination] = useState({}); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const fetchCourses = async () => {
        setLoading(true);
        setError(null); 
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/api/courses?page=${page||1}&limit=${limit||8}`);
            if (res.status === 200) {
                setCourses(res.data.courses);
                setPagination(res.data.pagination);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Add a new course
    const addCourse = async (data) => {
        setLoading(true);
        setError(null); // Reset the error state
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/api/courses`, data);
            if (res.status === 201) {
                console.log("Course added successfully:", res.data);
                fetchCourses(); // Refresh the course list
            }
        } catch (error) {
            console.error("Error adding course:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete a course
    const deleteCourse = async (id) => {
        setLoading(true);
        setError(null); // Reset the error state
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_BACKEND_URL}/api/courses/${id}`);
            if (res.status === 200) {
                console.log("Course deleted successfully:", res.data);
                fetchCourses(); // Refresh the course list
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Update a course
    const updateCourse = async (id, data) => {
        setLoading(true);
        setError(null); // Reset the error state
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_BACKEND_URL}/api/courses/${id}`, data);
            if (res.status === 200) {
                console.log("Course updated successfully:", res.data);
                fetchCourses(); // Refresh the course list
            }
        } catch (error) {
            console.error("Error updating course:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch courses on initial render
    useEffect(() => {
        fetchCourses();
    }, [limit , page]);

    // Return states and CRUD methods
    return {
        courses,
        pagination,
        loading,
        error,
        fetchCourses,
        addCourse,
        deleteCourse,
        updateCourse,
    };
};

export default useCourse;
