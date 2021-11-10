const responseMessage = (errStatus, text, data) => {
    let response = {
      error: errStatus,
      message: text,
      data: data || [],
    };
    return response;
  };

module.exports = responseMessage;