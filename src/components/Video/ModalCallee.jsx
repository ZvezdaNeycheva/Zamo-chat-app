export default function ModalCallee({ callData, onAccept, onReject }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl flex flex-col items-center gap-4">
        <p className="text-lg text-white font-semibold">
          Incoming call from {callData.callerName}
        </p>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            onClick={onAccept}
          >
            Accept
          </button>
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
            onClick={onReject}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
