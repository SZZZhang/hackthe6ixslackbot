const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

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

  await lib.airtable.query['@0.5.3'].update({
      baseId: `appqL94iCwYMURq37`,
      table: `survey`,
      where: [
          {
              'id__is': `${result.slack.user.id}`
          }
      ],
      limit: {
          'count': 0,
          'offset': 0
      },
      fields: {
          'Q10': `${(event.actions[0].name === 'Yes')? 1 : 0}`
      },
      typecast: false
  });
  
  
 const idk =  await lib.airtable.query['@0.5.3'].select({
    baseId: `appqL94iCwYMURq37`,
    table: `survey`,
    where: [
      {
        'id__is': `${result.slack.user.id}`
      }
    ],
    limit: {
      'count': 0,
      'offset': 0
    }
  });
  
  const fields = idk.rows[0]["fields"];
  console.log(fields);
const payload = {id: fields["id"],answers: [
  fields["Q1"],fields["Q2"],fields["Q3"],fields["Q4"],fields["Q5"],fields["Q6"],fields["Q7"],fields["Q8"],fields["Q9"],fields["Q10"],
] }

  
  console.log(payload);
  
 let randomstuff = await lib.http.request['@1.1.5']({
   method: 'POST',
   url: 'https://findmatch.azurewebsites.net/api/ml_service',
   body: `${JSON.stringify(payload)}`,
 });
 
 result_json = JSON.parse(randomstuff.body.toString());
 console.log(result_json["result"]);
 const matchedUser = result_json["result"]["output1"][0]["Item 1"];
 console.log(matchedUser);
 
  
  return result;
};