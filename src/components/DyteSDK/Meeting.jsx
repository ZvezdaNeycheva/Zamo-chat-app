import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router";
import { addMemberToCall } from "../../services/calls.service";
import { addMeetingDescription, getLiveMeetingInfo } from "../../services/meetings.service";
import { getUserByHandle } from "../../services/users.service";
import AlertModal from "../AlertModal/AlertModal";
import ChatBox from "../ChatBox/ChatBox";
import ChatTopBar from "../ChatTopBar/ChatTopBar";
import MeetingCall from "../MeetingCall/MeetingCall";
import TeamMember from "../TeamMember/TeamMember";

const Meeting = () => {
    const { userData } = useContext(AppContext);
    const { meetingId } = useParams();
    const [currentMeeting, setCurrentMeeting] = useState({});
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [isAddDescription, setIsAddDescription] = useState(false);
    const [description, setDescription] = useState(currentMeeting?.description);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const unsubscribe = getLiveMeetingInfo(snapshot => setCurrentMeeting({ ...snapshot }), meetingId);
        return () => unsubscribe();
    }, [meetingId]);

    useEffect(() => {
        if (loading) {
            addMemberToCall(data => {
                setToken(data);
                setLoading(false);
                navigate(`/meetings/${meetingId}/room/${currentMeeting.room}`);
            }, currentMeeting.room, userData);
        }
    }, [loading]);

    useEffect(() => {
        if (currentMeeting.members) {
            const promises = Object.keys(currentMeeting.members).map(member =>
                getUserByHandle(member)
                    .then((snapshot) => snapshot.val())
                    .catch((e) => console.error(e)));

            Promise.all(promises)
                .then((membersData) => setMembers((membersData)))
                .catch((e) => console.error(e));
        }
    }, [currentMeeting.members]);

    const handleJoinMeeting = () => {
        setLoading(true);
    };

    const handleDescription = (e) => {
        e.preventDefault();
        addMeetingDescription(meetingId, description)
            .then(() => {
                setDescription('');
                setIsAddDescription(false);
            })
            .catch((e) => console.error(e));
    };

    return (
        <>
            <div className="flex-1 flex flex-col bg-gray-700 ">
                <ChatTopBar meeting={currentMeeting} />
                {roomId ?
                    <div style={{ height: '50vh', width: 'auto' }} >
                        <MeetingCall token={token} />
                    </div>
                    :
                    <div className="flex gap-24 ml-5 text-gray-200">
                        <div>
                            {/* Description rendering code */}
                            <div className="flex items-center mt-2">
                                <button onClick={handleJoinMeeting} className="btn btn-sm border-none bg-green-500 text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-green-600">
                                    Join Call
                                </button>
                                {/* Leave meeting button */}
                            </div>
                        </div>
                        {showAlert && <AlertModal showAlert={setShowAlert} command={"leave this meeting"} meetingId={meetingId} />}
                        <br />
                        {/* Invited members rendering code */}
                    </div>
                }
                <ChatBox />
            </div>
        </>
    );
};

export default Meeting;
