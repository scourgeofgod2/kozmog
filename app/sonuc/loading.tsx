export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Back button skeleton */}
      <div className="mb-6">
        <div className="inline-block h-8 w-32 bg-gray-200 border-2 border-black animate-pulse" />
      </div>

      {/* Title skeleton */}
      <div className="text-center mb-8">
        <div className="h-9 bg-gray-200 border-2 border-black w-80 mx-auto mb-2 animate-pulse" />
      </div>

      <div className="space-y-6">
        {/* Number cards skeleton */}
        <div className="border-2 border-black bg-white animate-pulse" style={{ boxShadow: "6px 6px 0px #000" }}>
          <div className="bg-gray-300 h-16 border-b-2 border-black" />
          <div className="p-5 grid sm:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border-2 border-black p-4 flex items-center gap-3">
                <div className="w-14 h-14 bg-gray-200 border-2 border-black flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-3 bg-gray-200 w-24" />
                  <div className="h-4 bg-gray-200 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Reading skeleton */}
        <div className="border-2 border-black bg-white animate-pulse" style={{ boxShadow: "6px 6px 0px #000" }}>
          <div className="bg-violet-300 h-16 border-b-2 border-black" />
          <div className="p-6 space-y-3">
            <div className="h-4 bg-gray-200 w-full" />
            <div className="h-4 bg-gray-200 w-5/6" />
            <div className="h-4 bg-gray-200 w-4/6" />
            <div className="h-4 bg-gray-200 w-full" />
            <div className="h-4 bg-gray-200 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}