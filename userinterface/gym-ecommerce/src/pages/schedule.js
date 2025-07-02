import React from "react";

const Schedule = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-amber-400 flex flex-col items-center p-4 md:p-8">
      <header className="w-full max-w-4xl text-center py-14">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">Our Gym Schedule</h1>
        <div className="h-1 w-24 bg-amber-400 mx-auto rounded-full"></div>
      </header>
      
      <div className="w-full max-w-4xl bg-gray-900 p-4 md:p-8 rounded-xl shadow-2xl border border-gray-800 my-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm md:text-lg">
            <thead>
              <tr className="border-b-2 border-amber-500">
                <th className="py-4 px-2 text-left font-bold">Day</th>
                <th className="py-4 px-2 text-left font-bold">Opening</th>
                <th className="py-4 px-2 text-left font-bold">Closing</th>
              </tr>
            </thead>
            <tbody>
              {[
                { day: "Monday", open: "6:00 AM", close: "10:00 PM" },
                { day: "Tuesday", open: "6:00 AM", close: "10:00 PM" },
                { day: "Wednesday", open: "6:00 AM", close: "10:00 PM" },
                { day: "Thursday", open: "6:00 AM", close: "10:00 PM" },
                { day: "Friday", open: "6:00 AM", close: "9:00 PM" },
                { day: "Saturday", open: "7:00 AM", close: "8:00 PM" },
              ].map((item, index) => (
                <tr 
                  key={index} 
                  className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="py-4 px-2 font-medium">{item.day}</td>
                  <td className="py-4 px-2">{item.open}</td>
                  <td className="py-4 px-2">{item.close}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="w-full max-w-4xl bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 flex justify-center items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 bg-red-500 rounded-full"></div>
          <p className="text-lg font-medium">Sunday: <span className="text-amber-500 font-bold">Closed</span></p>
        </div>
      </div>
      
    </div>
  );
};

export default Schedule;