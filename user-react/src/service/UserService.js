import axios from "axios";

// GET List User
export function userList(callback, errorCallback) {
  axios
    .get("http://localhost:8082/api/users/list")
    .then((res) => {
      if (callback != null) {
        callback(res.data);
      }
    })
    .catch((err) => {
      if (errorCallback != null) {
        errorCallback(err.message);
      }
    });
}

// Delete User
export function userDelete(id) {
  axios
    .delete("http://localhost:8082/api/users/" + id)
    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(err.message);
    });
}
// GET User Detail
export function userDetail(id, callback, errorCallback) {
    axios
      .get("http://localhost:8082/api/users/" + id)
      .then((res) => {
        if (callback != null) {
          callback(res.data);
        }
      })
      .catch((err) => {
        if (errorCallback != null) {
          errorCallback(err.message);
        }
      });
  }