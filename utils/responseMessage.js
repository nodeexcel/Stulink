const responseMessage = (errStatus, text, data, states, city) => {
    let response = {
      error: errStatus,
      message: text,
      data: data || [],
    };
    return response;
  };

const searchPageMessage = (errStatus, text, data, states, city) => {
  let response = {
    error: errStatus,
    message: text,
    data: data,
    states: states,
    city: city
  };
  return response;
};
module.exports = {responseMessage, searchPageMessage};