const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const questions = require('../../../../helpers/questions.js')

/**
* An HTTP endpoint that acts as a webhook for Slack interactive_message event
* @param {object} event
* @returns {object} result Your return value
*/
module.exports = async (event) => {
  let result = {slack: {}};

  console.log(`Running [Slack → Retrieve Channel, DM, or Group DM by id]...`);
  result.slack.channel = await lib.slack.conversations['@0.2.14'].info({
    id: `${event.channel.id}`
  });

  console.log(`Running [Slack → Retrieve a User]...`);
  result.slack.user = await lib.slack.users['@0.4.0'].retrieve({
    user: `${event.user.id}`
  });
  
    console.log(event);
  await lib.slack.users['@0.4.0'].messages.create({
    user: `@${result.slack.user.name}`,
   attachments: [
       {
           "text": "",
           "fallback": "You are unable to choose a game",
           "callback_id": "q2",
           "color": "#3AA3E3",
           "attachment_type": "default",
           "actions": [
               {
                   "name": "Yes",
                   "text": "Yes",
                   "type": "button",
                   "value": "Yes",
                   "style":"primary",
               },
               {
                   "name": "No",
                   "text": "No",
                   "type": "button",
                   "style": "danger",
                   "value": "No"
               },
           ]
       }
   ],
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": "Alright! Please answer a few questions so I can get to know you better.",
          "emoji": true
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": questions["questions"]["q1"],
          "emoji": true
        }
      },
    ],
    as_user: true
  });
  
  return result;
};