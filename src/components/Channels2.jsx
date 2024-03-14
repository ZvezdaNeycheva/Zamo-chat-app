import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchChannelsIdsByGroup, fetchChannelsAll, addChannel, deleteChannel } from "../service/channel.service";
import { AppContext } from "../AppContext";


export function Channels2() {
  const [channels, setChannels] = useState({});
  let { idGroup } = useParams();
  let { idChannel } = useParams();
  const navigate = useNavigate();
  const { user, userData } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  
console.log({channels});

  useEffect(() => {
    const getChannels = async () => {
      const fetchedChannelsIds = await fetchChannelsIdsByGroup(idGroup);
      const fetchedChannels = await fetchChannelsAll();
      const filteredChannels = Object.keys(fetchedChannelsIds).reduce((acc, key) => {
        if (fetchedChannels[key]) {
          acc[key] = fetchedChannels[key];
        }
        return acc;
      }
        , {});

      setChannels(filteredChannels);
    };
    getChannels();
  }, [idGroup]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCreateChannel = async (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    if (!userData) {
      console.error("No current user found. Cannot create channel.");
      return; // Exit the function if there's no current user
    }

    try {
      await addChannel(groupId, userData.username, { "creator": userData.uid }, channelName);

      // Now, re-fetch the channels to update the UI
      fetchAndUpdateChannels();
      console.log("Channel created:", channelName);
      setIsModalVisible(false); // Close the modal
      setChannelName(''); // Reset the channel name input field
    } catch (error) {
      console.error("Failed to create channel:", error);
    }
  };

  const fetchAndUpdateChannels = async () => {
    const fetchedChannelsIds = await fetchChannelsIdsByGroup(groupId);
    const fetchedChannels = await fetchChannelsAll();
    const filteredChannels = Object.keys(fetchedChannelsIds).reduce((acc, key) => {
      if (fetchedChannels[key]) {
        acc[key] = fetchedChannels[key];
      }
      return acc;
    }, {});

    setChannels(filteredChannels);
  };

  const handleDeleteChannel = async (channelId) => {
    try {
      await deleteChannel(channelId);
      console.log("Channel deleted successfully");
      const updatedChannelIds = await fetchChannelsIdsByGroup(groupId);
      const allChannels = await fetchChannelsAll();

      const updatedChannels = Object.keys(updatedChannelIds).reduce((acc, key) => {
        if (allChannels[key]) {
          acc[key] = allChannels[key];
        }
        return acc;
      }, {});

      setChannels(updatedChannels);
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  return (
    <>
      <div className="p-6">
        <button
          onClick={toggleModal}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        >
          Create New Channel
        </button>
        {/* addChannel = (groupId, isPublic, creatorName, members, channelName) */}
        {/* Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-600 bg-opacity-50 flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Create New Channel</h2>
                <button onClick={toggleModal} className="text-gray-600 hover:text-gray-900">
                  &times;
                </button>
              </div>
              <form onSubmit={handleCreateChannel} className="mt-4 flex flex-col">
                <label htmlFor="channelName" className="block text-sm font-medium text-gray-700">Channel Name</label>
                <input
                  id="channelName"
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter Channel Name"
                  required
                />
                <div className="flex justify-between items-center mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Create Channel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="mt-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Channels</h3>

          <div className="mt-2">
            {/* Display channels here */}
            {Object.entries(channels).map(([key, channel]) => (

              <div key={key} idChannel={key} onClick={ () => navigate(`/groups/${idGroup}/channels/${key}`)} className="p-4 max-w-md bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 ease-in-out mb-3 cursor-pointer">

                <h5 className="mb-2 text-xl font-semibold tracking-tight text-blue-600">{channel.name}</h5>
                {
                  channel?.creatorId === currentUser?.uid && (
                    <div className="text-right">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChannel(key)
                      }}
                        className="text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-3 py-1 transition-colors duration-150 ease-in-out">
                        Delete the Channel
                      </button>
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
