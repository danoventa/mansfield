import _ from "lodash";

import slack from "../slack";
import CalendarPerson from "../models/calendar-person";
import CalendarGroup from "../models/calendar-group";
// TODO: Not sure if I want an event system in the mongoDb, given that it's already on gcal.
import CalendarEvent from "../models/calendar-event";
import { reply } from "../utils/message";

const parseEmail = (mailTo) => {
  return mailTo.split(/:|\|/)[1];
};

const addCalendarPerson = (message) => {
  const [name, email] = message.text.split(" ");
  if (_.isEmpty(name) || _.isEmpty(email)) {
    return reply(message, `Invalid format. Please provide a name followed by an email for this command. Use the help command if you need more detail.`);
  }

  const person = CalendarPerson({
    name: name,
    email: parseEmail(email)
  });
  person.save((err) => {
    if (!_.isEmpty(err)) {
      return reply(message, `Something went wrong. Please try again.`);
    }
    return reply(message, `Person successfully added.`);
  });
};

const getAllCalendarPeople = (message) => {
  CalendarPerson.find({}, (err, docs) => {
    if (err || _.isEmpty(docs)) {
      return reply(message, `Sorry, no calendar people for \`${message.text}\` were found.`)
    }

    const peopleString = _.map(docs, (person) => {
      return `${person.name}: ${person.email}`;
    }).join("\n");

    return reply(message, peopleString);
  });
};

const addCalendarGroup = (message) => {
  const name = message.text;
  if (_.isEmpty(name)) {
    return reply(message, `Invalid format. Please provide a name for this command. Use the help command if you need more detail.`);
  }

  const group = CalendarGroup({
    name: name
  });
  group.save((err) => {
    if (!_.isEmpty(err)) {
      return reply(message, `Something went wrong. Please try again.`);
    }
    return reply(message, `Group successfully added.`);
  });
};

const addCalendarPersonToGroup = (message) => {
  const [group, person] = message.text.split(" ");
  CalendarPerson.find({
    name: person
  }, (err, docs) => {
    if (err || _.isEmpty(docs)) {
      return reply(message, `Sorry, no calendar people for \`${message.text}\` were found.`)
    }

    // now that we have the person, let's get our group
    CalendarGroup.find({
      name: group
    }, (err2, docs2) => {
      if (err || _.isEmpty(docs)) {
        return reply(message, `Sorry, no calendar people for \`${message.text}\` were found.`)
      }

      // now that we have the person and group, apend the user and save
      docs2[0].members = docs2[0].members.concat(docs[0]);
      docs2[0].save();
      return reply(message, `${person} added to group: ${group}`);
    });
  });
};

const removeCalendarPersonFromGroup = (message) => {
  const [group, person] = message.text.split(" ");
  CalendarPerson.find({
    name: person
  }, (err, docs) => {
    if (err || _.isEmpty(docs)) {
      return reply(message, `Sorry, no calendar people for \`${message.text}\` were found.`)
    }

    // now that we have the person, let's get our group
    CalendarGroup.find({
      name: group
    }, (err2, docs2) => {
      if (err || _.isEmpty(docs)) {
        return reply(message, `Sorry, no calendar people for \`${message.text}\` were found.`)
      }

      // now that we have the person and group, apend the user and save
      docs2[0].members = _.remove(docs2[0].members, docs[0]);
      docs2[0].save();
      return reply(message, `${person} removed from group: ${group}`);
    });
  });
};

const triggers = [
  {
    trigger: `add calendar person`,
    action: addCalendarPerson,
    title: "Add Calendar Person",
    help: `Create a new person for the calendar system "$BOTNAME add calendar person [NAME] [EMAIL]"`
  }, {
    trigger: `view calendar people`,
    action: getAllCalendarPeople,
    title: "View All Calendar People",
    help: `Shows a list of all people added to the calendar plugin "$BOTNAME view calendar people"`
  }, {
    trigger: `add calendar group person`,
    action: addCalendarPersonToGroup,
    title: "Add Person to Calendar Group",
    help: `Adds a new person to a calendar group "$BOTNAME add calendar group person [GROUP] [PERSON]"`
  }, {
    trigger: `remove calendar group person`,
    action: removeCalendarPersonFromGroup,
    title: "Remove Person from Calendar Group",
    help: `Removes a person from a calendar group "$BOTNAME remove calendar group person [GROUP] [PERSON]"`
  }, {
    trigger: `add calendar group`,
    action: addCalendarGroup,
    title: "Create New Calendar Group",
    help: `Creates a new group to use for calendar events "$BOTNAME add calendar group [NAME]"`
  }
];

export default triggers;