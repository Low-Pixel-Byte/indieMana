export const Skeleton = () => {
  return (
    <div className="flex bg-gray-900 text-white p-6 space-x-6 animate-pulse">
      <div className="flex-1 relative">
        <div className="w-full h-80 bg-gray-700 rounded-lg"></div>
        <div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-70 px-4 py-2 rounded text-lg font-bold w-32 h-6"></div>
      </div>

      <div className="w-1/3 flex flex-col space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden cursor-pointer"
          >
            <div className="w-full h-24 bg-gray-700 rounded-lg"></div>
            <div className="absolute inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center">
              <div className="w-24 h-4 bg-gray-600 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
