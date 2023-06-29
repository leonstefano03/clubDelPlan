import * as Contacts from "expo-contacts";
import { getAllUsers } from "./getAllUsers";

function getContactNumbers(data) {
  const phoneNumbers = [];
  for (let i = 0; i < data.length; i++) {
    const contact = data[i];
    if (contact.phoneNumbers) {
      const phoneNumber = contact.phoneNumbers[0]?.number;
      if (phoneNumber) phoneNumbers.push(phoneNumber);
    }
  }
  return phoneNumbers;
}

async function filterContacts(phoneNumbers) {
  const users = await getAllUsers();
  const filteredPhoneNumbers = [];

  for (const user of users) {
    if (user.phone) {
      if (phoneNumbers.includes(user.phone)) filteredPhoneNumbers.push(user);
    }
  }
  return filteredPhoneNumbers;
}

export async function fetchContacts() {
  try {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      const phoneNumbers = getContactNumbers(data);
      const filteredContacts = await filterContacts(phoneNumbers);
      console.log("filtered contacts", filteredContacts);
      return filteredContacts;
    }
  } catch (error) {
    console.error(error);
  }
}
