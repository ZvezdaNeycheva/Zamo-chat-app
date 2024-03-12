import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchChannelsIdsByGroup, fetchChannelsAll } from "../service/channel.service";
import { AppContext } from "../AppContext";


export function Channels({groupId}) {
    const [channels, setChannels] = useState({});
    let { idChannel } = useParams();
    const navigate = useNavigate();
    const { user, userData } = useContext(AppContext);

    useEffect(() => {
        const getChannels = async () => {
          const fetchedChannelsIds = await fetchChannelsIdsByGroup(groupId);
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
      }, []);
    



return(
<div className="mt-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Channels</h3>
          
          <div className="mt-2">
            {/* Display channels here */}
            {Object.entries(channels).map(([key, channel]) => (
              <div key={key} 
              // onClick={() => navigate(`/groups/${group.idGroup}/channels/${channels.idChannel}`)} 
              className="p-4 max-w-md bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 ease-in-out mb-3 cursor-pointer">
                <h5 className="mb-2 text-xl font-semibold tracking-tight text-blue-600">{channel.name}</h5>
                <p className="font-normal text-gray-600">{channels.isPublic ? 'Public' : 'Private'}</p>
                {
                  channel?.creatorId === userData?.uid && (
                    <div className="text-right">
                      <button onClick={() => handleDeleteChannel(key)} className="text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-3 py-1 transition-colors duration-150 ease-in-out">
                        Delete the Channel
                      </button>
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        </div>
)
}