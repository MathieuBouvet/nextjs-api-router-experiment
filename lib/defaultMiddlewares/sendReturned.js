async function sendReturned({ res, next }) {
  const result = await next();
  res.json(result);
}

export default sendReturned;
