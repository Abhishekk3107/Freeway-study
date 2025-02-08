import { useState, useEffect } from "react";
import axios from 'axios';

const useFeedback = () => {
    const [allFeedback, setAllFeedback] = useState([]);
    const [approvedFeedback, setApprovedFeedback] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch data for both all feedback and approved feedback
    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch approved feedback
            const res = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/api/feedback/approved`);
            // Fetch all feedback
            const res2 = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/api/feedback`);

            // Check response and update state
            if (res.status === 200) {
                setApprovedFeedback(res.data);  
            }
            if (res2.status === 200) {
                setAllFeedback(res2.data);  
            }
        } catch (error) {
            console.error("Error fetching feedback:", error);
        } finally {
            setLoading(false);  // Ensure loading is set to false after fetching data
        }
    }

    // Call fetchData on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Add new feedback
    const addFeedback = async (data) => {
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/api/feedback`, data);
            if (res.status === 201) {
                // Assuming res.data has a 'feedback' key
                setAllFeedback((prevFeedback) => [...prevFeedback, res.data.feedback]);
                console.log('Added Feedback:', res.data);
            }
        } catch (error) {
            console.error("Error adding feedback:", error);
        } finally {
            setLoading(false);
        }
    }

    // Update approval status of feedback
    const updateApprovalStatus = async (id, isApproved) => {
        setLoading(true);
        try {
            const res = await axios.patch(`${import.meta.env.VITE_API_BACKEND_URL}/api/feedback/${id}`, { isApproved });
            if (res.status === 200) {
                // Update the approved feedback list
                // setApprovedFeedback((prevApprovedFeedback) => [...prevApprovedFeedback, res.data.feedback]);
                fetchData();
                console.log('Updated Approval Status:', res.data);
            }
        } catch (error) {
            console.error("Error updating approval status:", error);
        } finally {
            setLoading(false);
        }
    }

    return {
        allFeedback,
        approvedFeedback,
        loading,
        addFeedback,
        updateApprovalStatus
    };
}

export default useFeedback;
