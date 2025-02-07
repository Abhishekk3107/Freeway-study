import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import useCourse from "../../../hooks/useCourse";

function Course({ setActiveComponent, setCourseData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { courses, pagination, loading, fetchCourses, deleteCourse } = useCourse(8, currentPage);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [actionMenu, setActionMenu] = useState(null);

  const itemsPerPage = 8;
  const totalPages = pagination ? pagination.totalPages : 0;

  useEffect(() => {
    fetchCourses(itemsPerPage, currentPage); // Fetch courses whenever the current page changes
  }, [currentPage]);

  const handleSelectAll = () => {
    const currentPageItems = courses.map((_, index) => index); // Select all items on the current page
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentPageItems);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach((index) => {
      const courseId = courses[index]?.id;
      if (courseId) deleteCourse(courseId);
    });
    setSelectedItems([]);
    fetchCourses(currentPage, itemsPerPage); // Refresh the course list
  };

  if (loading) return (<div className="w-full flex justify-center items-center text-gray-400">
    <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-600 w-12 h-12"></div>
  </div>);

  return (
    <div className="py-4 bg-white rounded-xl lightdropshadowbox">
      {/* Header Section */}
      <div className="flex px-4 space-x-4 mb-4 items-center">
        <div className="flex space-x-3 items-center">
          <h2 className="font-bold text-lg">Course</h2>
          <span className="bg-purple-200 px-2 text-xs rounded-full">
            {pagination ? pagination.totalCourses : 0} courses
          </span>
        </div>
        <div className="flex justify-end flex-1 items-center space-x-4">
          {selectedItems.length >= 2 && (
            <MdDelete size={26} className="cursor-pointer" onClick={handleDeleteSelected} />
          )}
          <button
            onClick={() => setActiveComponent("Add Course")}
            className="bg-[#4B0082] text-nowrap font-semibold border shadow-md text-white py-2 px-4 rounded-md"
          >
            Create
          </button>
        </div>
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto scrollbar-hidden">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className=" border-b bg-gray-100 border-gray-200 text-center h-16">
              <th className="p-2 px-4 font-medium text-sm text-gray-500">
                <input
                  type="checkbox"
                  className="checked:bg-purple-500 checked:border-purple-500"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="py-3 px-4 font-medium text-sm text-gray-500">Name</th>
              <th className="py-3 px-4 font-medium text-sm text-gray-500">Duration</th>
              <th className="py-3 px-4 font-medium text-sm text-gray-500">Syllabus</th>
              <th className="py-3 px-4 font-medium text-sm text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses && courses.length > 0 ? (
              courses.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 h-16">
                  <td className="p-2 px-4">
                    <input
                      type="checkbox"
                      className="checked:bg-purple-500 checked:border-purple-500"
                      checked={selectedItems.includes(index)}
                      onChange={() => handleSelectItem(index)}
                    />
                  </td>
                  <td className="p-2 font-medium text-sm text-gray-600">{item.name}</td>
                  <td className="p-2 font-medium text-sm text-gray-400">{item.duration}</td>
                  <td className="p-2 font-medium text-sm text-gray-400">{item.syllabus}</td>
                  <td className="p-2 relative">
                    <FiMoreVertical
                      className="cursor-pointer"
                      onClick={() =>
                        setActionMenu((prev) => (prev === index ? null : index))
                      }
                    />
                    {actionMenu === index && (
                      <div className="absolute right-0 top-10 bg-white shadow-lg border rounded-md w-32">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setCourseData(item);
                            setActiveComponent("Update Course");
                            setActionMenu(null);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                          onClick={() => {
                            deleteCourse(item._id);
                            setActionMenu(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No courses available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 px-4">
        <button
          className="py-2 px-4 bg-white shadow-md border text-black rounded-md"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <div className="space-x-2">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              className={`py-2 px-4 rounded-md shadow-md border ${currentPage === page + 1 ? "bg-purple-700 text-white" : "bg-white text-black"
                }`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}
        </div>
        <button
          className="py-2 px-4 bg-white shadow-md border text-black rounded-md"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Course;
