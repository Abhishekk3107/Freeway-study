import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import useUnit from "../../../hooks/useUnit";

function Unit({ setActiveComponent }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { units, pagination, loading, fetchUnits, deleteUnit } = useUnit(8, currentPage);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [actionMenu, setActionMenu] = useState(null);

  const totalPages = pagination ? pagination.totalPages : 0;

  useEffect(() => {
    fetchUnits();
  }, [currentPage]);

  const handleSelectAll = () => {
    const currentPageItems = units.map((_, index) => index);
    setSelectedItems(selectAll ? [] : currentPageItems);
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach((index) => {
      const unitId = units[index]?.id;
      if (unitId) deleteUnit(unitId);
    });
    setSelectedItems([]);
    fetchUnits(currentPage);
  };

  if (loading) return <div className="w-full flex justify-center items-center text-gray-400">Loading...</div>;
console.log(units)
  return (
    <div className="py-4 bg-white rounded-xl lightdropshadowbox">
      <div className="flex px-4 space-x-4 mb-4 items-center">
        <div className="flex space-x-3 items-center">
          <h2 className="font-bold text-lg">Units</h2>
          <span className="bg-purple-200 px-2 text-xs rounded-full">
            {pagination ? pagination.totalUnits : 0} units
          </span>
        </div>
        <div className="flex justify-end flex-1 items-center space-x-4">
          {selectedItems.length >= 2 && (
            <MdDelete size={26} className="cursor-pointer" onClick={handleDeleteSelected} />
          )}
          <button
            onClick={() => setActiveComponent("Add Unit")}
            className="bg-[#4B0082] text-nowrap font-semibold border shadow-md text-white py-2 px-4 rounded-md"
          >
            Create
          </button>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hidden">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="border-b bg-gray-100 border-gray-200 text-center h-16">
              <th className="p-2 px-4 font-medium text-sm text-gray-500">
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
              </th>
              <th className="py-3 px-4 font-medium text-sm text-gray-500">Unit Name</th>
              <th className="py-3 px-4 font-medium text-sm text-gray-500">Subject</th>
              <th className="py-3 px-4 font-medium text-sm text-gray-500">Notes</th>
              <th className="py-3 px-4 font-medium text-sm text-gray-500">Videos</th>
              <th className="py-3 px-4 font-medium text-sm text-gray-500">Extra Notes</th>
              <th className="py-3 px-4 font-medium text-sm text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {units && units.length > 0 ? (
              units.map((unit, index) => (
                <tr key={index} className="border-b border-gray-200 h-16">
                  <td className="p-2 px-4">
                    <input type="checkbox" checked={selectedItems.includes(index)} onChange={() => handleSelectItem(index)} />
                  </td>
                  <td className="p-2 font-medium text-sm text-gray-600">{unit.name}</td>
                  <td className="p-2 font-medium text-sm text-gray-400">{unit.subject?.name}</td>
                  <td className="p-2 font-medium text-sm text-gray-600">{unit.notes}</td>
                  <td className="p-2 font-medium text-sm text-gray-400">
                    {unit.video.map((vid, idx) => <div key={idx}>{vid}</div>)}
                  </td>
                  <td className="p-2 font-medium text-sm text-gray-400">
                    {unit.extraNotes.map((note, idx) => <div key={idx}>{note}</div>)}
                  </td>
                  <td className="p-2 relative">
                    <FiMoreVertical className="cursor-pointer" onClick={() => setActionMenu(actionMenu === index ? null : index)} />
                    {actionMenu === index && (
                      <div className="absolute right-0 top-10 bg-white shadow-lg border rounded-md w-32">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setActiveComponent("Update Unit")}>
                          Edit
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100" onClick={() => deleteUnit(unit._id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">No units available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 px-4">
        <button className="py-2 px-4 bg-white shadow-md border text-black rounded-md" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </button>
        <div className="space-x-2">
          {[...Array(totalPages).keys()].map((page) => (
            <button key={page} className={`py-2 px-4 rounded-md shadow-md border ${currentPage === page + 1 ? "bg-purple-700 text-white" : "bg-white text-black"}`} onClick={() => setCurrentPage(page + 1)}>
              {page + 1}
            </button>
          ))}
        </div>
        <button className="py-2 px-4 bg-white shadow-md border text-black rounded-md" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Unit;