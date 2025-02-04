import React , {useState , useEffect} from 'react'
import { Course ,  Semester , Subject , Unit , AddCourse , UpdateCourse } from '../Components'

function Resources() {
  const [activeComponent, setActiveComponent] = useState("Course");
  const [courseData , setCourseData] = useState({});

  const renderComponent = () => {
    switch (activeComponent) {
      case "Course":
        return (
          <Course
            setActiveComponent={setActiveComponent}
            setCourseData={setCourseData}
          />
        );
      case "Add Course":
        return <AddCourse setActiveComponent={setActiveComponent} />;
      case "Update Course":
        return (
          <UpdateCourse courseData={courseData} setActiveComponent={setActiveComponent} />
        );
      case "Semester":
        return <Semester  setActiveComponent={setActiveComponent} />;
      // case "Add Education":
      //   return <AddEducation setActiveComponent={setActiveComponent} />;
      // case "Update Video":
      //   return <UpdateVideo  videoData={videoData} setActiveComponent={setActiveComponent} />;
      // case "Update File":
      //   return <UpdateFile  fileData={fileData} setActiveComponent={setActiveComponent} />;
      case "Subject":
        return (
  
          <Subject
            // setEmployeeData={setEmployeeData}
            setActiveComponent={setActiveComponent}
          />
      
        );
      // case "Add Employeenews":
      //   return <AddEmployeeNews setActiveComponent={setActiveComponent} />;
      // case "Update Employeenews":
      //   return (
      //     <UpdateEmployeeNews
      //       employeeData={employeeData}
      //       setActiveComponent={setActiveComponent}
      //     />
      //   );
      case "Unit":
        return (
      
          <Unit
            setActiveComponent={setActiveComponent}
          />
        );
      // case "Add Studentnews":
      //   return <AddStudentNews setActiveComponent={setActiveComponent} />;
      // case "Update Studentnews":
      //   return (
      //     <UpdateStudentNews
      //       studentData={studentData}
      //       setActiveComponent={setActiveComponent}
      //     />
      //   );
      default:
        return <></>;
    }
  };

  return (<div className='p-8 bg-gray-200 min-h-screen'>
    <div className="rounded-xl pt-4  bg-gray-50 mt-12 ">
    <div className="flex space-x-4 mb-4 px-4 max-lg:flex-col-reverse max-lg:gap-2">
      <div className="flex space-x-4">
        <div
          onClick={() => setActiveComponent("Course")}
          className={`${
            activeComponent === "Course"
              ? "bg-[#4B0082] text-white" // Active state
              : "bg-white text-gray-700" // Inactive state
          } text-center shadow-md rounded-xl flex flex-col justify-center items-center p-2 h-16 cursor-pointer`}
        >
          <p className="text-nowrap">Course Corner</p>
          <p className="font-bold">100</p>
        </div>
        <div
          onClick={() => setActiveComponent("Semester")}
          className={`${
            activeComponent === "Semester"
              ? "bg-[#4B0082] text-white" // Active state
              : "bg-white text-gray-700" // Inactive state
          } text-center shadow-md rounded-xl flex flex-col justify-center items-center p-2 h-16 cursor-pointer`}
        >
          <p className="text-nowrap">Semester Corner</p>
          <p className="font-bold">100</p>
        </div>
        <div
          onClick={() => setActiveComponent("Subject")}
          className={`${
            activeComponent === "Subject"
              ? "bg-[#4B0082] text-white" // Active state
              : "bg-white text-gray-700" // Inactive state
          } text-center shadow-md rounded-xl flex flex-col justify-center items-center p-2 h-16 cursor-pointer`}
        >
          <p className="text-nowrap">Subject Corner</p>
          <p className="font-bold">100</p>
        </div>
        <div
          onClick={() => setActiveComponent("Unit")}
          className={`${
            activeComponent === "Unit"
              ? "bg-[#4B0082] text-white" // Active state
              : "bg-white text-gray-700" // Inactive state
          } text-center shadow-md rounded-xl flex flex-col justify-center items-center p-2 h-16 cursor-pointer`}
        >
          <p className="text-nowrap">Unit Corner</p>
          <p className="font-bold">100</p>
        </div>
      </div>
    </div>

    {/* <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="text-left border-b bg-gray-100 border-gray-200 h-16">
            <th className="p-2 px-4 font-medium text-sm text-gray-200">
              <input
                type="checkbox"
                className="checked:bg-purple-500 checked:border-purple-500 size-4 bg-col"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="py-3 px-4 text-left font-medium text-sm text-gray-500  w-52">
              Title
            </th>
           <th className="py-3 px-4 text-left font-medium text-sm text-gray-500 text-nowrap">
              Event Date & Time
            </th>
           <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">Days</th>
           <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">
              Location
            </th>
           <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">
              Description
            </th>
            <th className="p-2 font-medium text-sm text-gray-600 max-w-32">
              Url
            </th>
           <th className="py-3 px-4 text-left font-medium text-sm text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 7).map((item, index) => (
            <tr key={index} className="border-b border-gray-200 h-16">
              <td className="p-2 px-4 font-medium text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="checked:bg-purple-500 checked:border-purple-500 size-4 bg-col"
                  checked={selectedItems.includes(index)}
                  onChange={() => handleSelectItem(index)}
                />
              </td>
              <td className="p-2 font-medium text-sm text-gray-600 max-w-52 whitespace-nowrap overflow-hidden text-ellipsis">
                {item.title}
              </td>
              <td className="p-2 font-medium text-sm text-gray-400">
                {item.eventDateTime}
              </td>
              <td className="p-2 font-medium text-sm text-gray-400">
                {item.days}
              </td>
              <td className="p-2 font-medium text-sm text-gray-400">
                {item.location}
              </td>
              <td className="p-2 font-medium text-sm text-gray-400">
                {item.description.substring(0, 20)}...
              </td>
              <td className="p-2 font-medium text-sm text-gray-400">
                <Link
                  to={item.url}
                  className="text-blue-500 max-w-32 whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {item.url}
                </Link>
              </td>
              <td className="p-2 font-medium text-sm text-gray-600 cursor-pointer">
                <BsThreeDotsVertical />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}
    {renderComponent()}
    {/* <div className="flex justify-between items-center mt-4 px-4">
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
            className={`py-2 px-4 rounded-md shadow-md border ${
              currentPage === page + 1
                ? "bg-purple-700 text-white"
                : "bg-white text-black"
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
        onClick={() =>
          setCurrentPage((prev) => Math.min(prev + 1, totalPages))
        }
      >
        Next
      </button>
    </div> */}
  </div></div>
 )
}

export default Resources