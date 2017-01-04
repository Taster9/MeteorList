import { Template } from 'meteor/templating';

import { Chats } from '../api/chats.js';

import './chat.html';

Template.chat.events({
    'click .delete'() {
        Chats.remove(this._id);
    },
    'click .up'() {
        Chats.update(this._id, {
            $set: { score : this.score + 1 }
        });
    },
    'click .down'() {
        if (this.score > 0){
            Chats.update(this._id, {
                $set: { score : this.score - 1 }
            });
        }
    },
    'click .text'(event) {
        var span = event.target.innerHTML;
        var template = '<input id="input-temp" class="update" type="text" value="'+ span +'">';
        event.target.innerHTML = template;
    },
    'keyup .update'(event) {
        if(event.which === 13){
            const target = event.target;
            const text = target.value;
            Chats.update(this._id, {
                $set: { text : text }
            });
            var template = '<span class="text">' + text + '</span>';
            $('#input-temp').remove();
        }
    }
});