import React from "react";
import { useCall } from "../../CallContext";
import ModalCallee from "./ModalCallee";
import { useNavigate } from "react-router-dom";

export default function GlobalIncomingCallModal() {
  const { incomingCall, setIncomingCall } = useCall();
  const navigate = useNavigate();

  if (!incomingCall) return null;

  const handleAccept = () => {
    if (!incomingCall) return;
    // Navigate to DirectVideo passing callee info
    navigate(`/video/${incomingCall.callerId}`, {
      state: {
        username: incomingCall.callerName,
        autoJoin: true,
        callKey: incomingCall.key,
        callId: incomingCall.callId
      }
    });
    setIncomingCall(null);
  };

  const handleReject = async () => {
    // Optionally call Firebase function to mark rejected
    try {
      await addRejectCallToDb(incomingCall.callId, user.uid); // mark call rejected
      await removeIncoming(user.uid, incomingCall.key);       // remove your incoming entry
    } catch (err) {
      console.error("Failed to clean DB on reject:", err);
    } finally {
      setIncomingCall(null);
    }
  };

  return (
    <ModalCallee
      callData={incomingCall}
      onAccept={handleAccept}
      onReject={handleReject}
    />
  );
}
