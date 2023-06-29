import { fetchContacts } from "./fetchContacts";
import { getUserFriends } from "./getUserFriends";
import { addFriend } from "./addFriend";

export const addContactsAsFriends = async () => {
  const contacts = await fetchContacts();
  const friends = await getUserFriends();
  const missingContacts = findMissingContacts(contacts, friends);
  for (const contact of missingContacts) {
    await addFriend(contact);
  }
};

function findMissingContacts(contacts, friends) {
  const missingContacts = [];
  for (const contact of contacts) {
    if (!friends.some((friend) => friend.id === contact.id)) {
      missingContacts.push(contact);
    }
  }
  return missingContacts;
}
