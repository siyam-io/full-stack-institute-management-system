

const CourseDistributionTable = ({ courseDistribution, totalStudents }) => {
  return (
    <div className="card-premium">
      <h2 className="text-lg font-semibold mb-4">Students per Course</h2>
      <div className="overflow-x-auto">
        <table className="table-premium">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Students</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {courseDistribution?.map((course, index) => (
              <tr key={index} className="border-b hover:bg-white/5">
                <td className="py-3 px-4">{course._id}</td>
                <td className="py-3 px-4 font-medium">{course.students}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-full bg-white/10 rounded-full h-2 mr-2">
                      <div 
                        className="bg-prestige-gold h-2 rounded-full" 
                        style={{ 
                          width: `${(course.students / totalStudents) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-zinc-500">
                      {((course.students / totalStudents) * 100).toFixed(1)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseDistributionTable;