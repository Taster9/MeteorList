import { Template } from 'meteor/templating';

import { Chats } from '../api/chats.js';

import './chat.js';
import './body.html';
import './dropzone.html';
import './dropzone.js';

Template.body.helpers({
    chats() {
        // Show newest tasks at the top
        return Chats.find({}, { sort: { score: -1 } });
    },
});

Template.body.events({
    'submit .new-chat'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;
        const score = 0;

        // Insert a cat into the collection
        if(target.text.value != ''){
            Chats.insert({
                text,
                createdAt: new Date(), // current time
                score
            });
        }

        // Clear form
        target.text.value = '';
    }
});