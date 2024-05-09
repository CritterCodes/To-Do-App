const middleware = () => (err, req, res, next) => {
  console.error(`ERROR : The following error occurred : ${err}`);

  if (err.type === 'ValidationError') {
    // Respond with a 400 Bad Request for validation errors
    res.status(err.statusCode || 400).json({
      error: true,
      type: 'ValidationError',
      errorMessage: 'Invalid input, please check your data.',
      details: err.details // Details from AJV about what went wrong
    });
  } else {
    // Default to a 500 Internal Server Error for all other errors
    res.status(err.statusCode || 500).json({
      error: true,
      errorMessage: err.message || 'Something went horribly wrong',
    });
  }
};

export default middleware;