const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

module.exports = {
  list: async (channelName) => {
    let selectQueryResult = await lib.airtable.query['@0.5.3'].select({
      table: `Reminders`,
      where: [
        {
          'Status__is': `Todo`,
        }
      ]
    });
    await lib.slack.channels['@0.7.2'].messages.create({
      channel: `${channelName}`,
      text: `Here are the current reminders for your workspace:`,
      attachments: selectQueryResult.rows.map((row) => {
        let reminderText = `*${row.fields.Name}*\n${row.fields.Notes}`;
        if (row.fields['Slack User Id']) {
          reminderText = reminderText + `\n*Created by:* <@${row.fields['Slack User Id']}>`
        }
        return {
          text: reminderText,
          color: '#E01E5A'
        };
      }).concat([{
        text: 'You can add more reminders with */cmd todo add*'
      }, {
        text: 'You can mark reminders as complete with */cmd todo complete <reminder name>*'
      }])
    });
    return selectQueryResult;
  }
}