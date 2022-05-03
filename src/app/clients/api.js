const execute = async (url, config = {}) => {
  try {
    const res = await fetch(url, config);
    return res.json();
  } catch (e) {
    console.log(e)
    throw new Error(e);
  }
}

const get = async (url) => {
  return execute(url)
};

const post = async (url, body) => {
  return execute(url, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: body,
  })
};

const patch = async (url, body) => {
 return execute (url, {
  method: "PATCH",
  headers: {'Content-Type': 'application/json'},
  body: body,
})
};

const delet = async (url) => {
 return execute(url, {
  method: "DELETE",
})
};

const api = {
  get: (url) => get(url),
  delete: (url) => delet(url),
  post: (url, body) => post(url, body),
  patch: (url, body) => patch(url, body),
};

export default api;
