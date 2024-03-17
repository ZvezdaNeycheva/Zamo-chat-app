import { get, set, ref, getDatabase, push, child, remove, update } from 'firebase/database';
import { db } from './firebase-config';
import { format } from 'date-fns';
import { getUserData, updateUserData } from './users.service';
// Groups
export const createGroup = async (groupName, creatorId, creatorName, members) => {
  const readableDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  const groupsRef = ref(getDatabase(), 'groups');
  const newGroupRef = push(groupsRef);

  const groupData = {
    id: newGroupRef?.key,
    name: groupName,
    createdOnReadable: readableDate,
    creatorId,
    creatorName,
    members: arrayToObject(members)
  };

  try {
    await set(newGroupRef, groupData);
    console.log("Group created successfully with ID:", newGroupRef.key);
    await createChannel(newGroupRef.key, creatorName, members, '#General', creatorId);
    for (const id of members) {
      await update(ref(db, `users/${id}/groups`), { [newGroupRef?.key]: true });
    }
    return groupData; // Return the full group object
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};

export const fetchGroups = async () => {
  const dbRef = ref(getDatabase());
  try {
    const snapshot = await get(child(dbRef, `groups`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No groups available");
      return {};
    }
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
}

export const deleteGroup = async (groupId) => {
  const groupRef = ref(db, `groups/${groupId}`);
  const snapshot = await get(groupRef);
  if (!snapshot.exists()) {
    console.log("No group with id " + id);
    return;
  }
  try {
    const group = snapshot.val();
    for (const channelId in group.channels ?? {}) {
      await deleteChannel(channelId);
    }
    for (const memberId in group.members ?? {}) {
      await remove(ref(db, `users/${memberId}/groups/${groupId}`));
    }
    await remove(groupRef);
    console.log('Group deleted successfully.');
  } catch (error) {
    console.error('Error deleting group:', error);
    throw error;
  }
};

export const createChannel = async (groupId, creatorName, members, channelName = '#General', creatorId) => {
  const readableDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  try {
    const dbChannel = await push(ref(db, `groups/${groupId}/channels`), {});
    const dbRoom = await push(ref(db, `rooms`), {
      type: 'channel',
      participants: arrayToObject(members),
    });
    const props = {
      name: `${channelName}`,
      createdOnReadable: readableDate,
      group: groupId,
      id: dbChannel.key,
      room: dbRoom.key,
      creatorName,
      creatorId,
    };
    console.log(props);
    await set(ref(db, `channels/${dbChannel.key}`),
      props);

    await update(ref(db), {
      [`groups/${groupId}/channels/${dbChannel.key}`]: true,
    })
    for (const id of members) {
      await update(ref(db, `users/${id}/channels`), { [dbChannel.key]: true });
    }
    return dbChannel.key;
  } catch (e) {
    console.error(e);
  }
}

export const fetchChannelsIdsByGroup = async (groupId) => {
  const dbRef = ref(getDatabase());
  try {
    const snapshot = await get(child(dbRef, `groups/${groupId}/channels`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("Err! Must have at least one channel");
      return {};
    }
  } catch (error) {
    console.log("Error fetching channels ids", error);
    throw error;
  }
};

export const fetchChannelsAll = async () => {
  const dbRef = ref(getDatabase());
  try {
    const snapshot = await get(child(dbRef, `channels`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("Err! Must have at least one channel");
      return {};
    }
  } catch (error) {
    console.log("Error fetching channels:", error);
    throw error;
  }
};

export const deleteChannel = async (channelId) => {
  const channelRef = ref(db, `channels/${channelId}`);
  const snapshot = await (get(channelRef));
  if (!snapshot.exists()) {
    console.log("No channel with id " + id);
    return;
  }
  try {
    const channel = snapshot.val();
    for (const memberId in channel.members ?? {}) {
      await remove(ref(db, `users/${memberId}/channels/${channelId}`));
    }
    await remove(ref(db, `groups/${channel.group}/channels/${channelId}`));
    await remove(channelRef);
    console.log('Channel deleted successfully.');
  } catch (error) {
    console.error('Error deleting channel:', error);
    throw error;
  }
};

export const fetchChannel = async (channelId) => {
  const snapshot = await get(ref(db, `channels/${channelId}`));
  if (!snapshot.exists()) throw new Error('No channel with id ' + channelId);
  return snapshot.val();
};

function arrayToObject(array) {
  // ["1298374fdasjf", "213984712934"] => [[1298374fdasjf: true], [213984712934: true]] => {1298...: true, 2139: true}
  return Object.fromEntries(array.map(id => [id, true]));
}