const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

/** Hello shaneeee!!!!!!!
* An HTTP endpoint that acts as a webhook for HTTP(S) request event
* @returns {object} result Your return value
*/
module.exports = async () => {
  let result = await lib.http.request['@1.1.5']({
    method: 'POST',
    url: `https://findmatch.azurewebsites.net/api/ml_service`,
    body: `{\"id\":\"sdfsd\"}`
  });
  result_json = JSON.parse(result.body.toString())
  console.log(result_json["matched_id"]);

  return result;
};