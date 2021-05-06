const sql = require("../config/db");

const Applicant = function (applicant) {
  this.FirstName = applicant.FirstName;
  this.LastName = applicant.LastName;
  this.Email = applicant.Email;
  this.DateOfBirth = applicant.DateOfBirth;
  this.PhoneNo = applicant.PhoneNo;
  this.Ckeditor = applicant.Ckeditor;
};

Applicant.create = (newUser, result) => {
  console.log('newUser', newUser);
  sql.query("INSERT INTO applicants SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

Applicant.findById = (id, result) => {
  sql.query(`SELECT * FROM applicants WHERE id = '${id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found applicant: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Applicant.getAll = (result) => {
  sql.query("SELECT * FROM applicants", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("applicants: ", res);
    result(null, res);
  });
};

Applicant.updateById = (id, applicant, result) => {
  sql.query(
    "UPDATE applicants SET FirstName = ?, LastName = ?, Email = ?, DateOfBirth = ?, PhoneNo = ?, Ckeditor = ?, WHERE id = ?",
    [
      applicant.FirstName,
      applicant.LastName,
      applicant.Email,
      applicant.DateOfBirth,
      applicant.PhoneNo,
      applicant.Ckeditor,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated applicant: ", { id: id, ...applicant });
      result(null, { id: id, ...applicant });
    }
  );
};

Applicant.remove = (id, result) => {
  sql.query("DELETE FROM applicants WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted applicant with id: ", id);
    result(null, res);
  });
};

Applicant.removeAll = (result) => {
  sql.query("DELETE FROM applicants", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} applicant`);
    result(null, res);
  });
};

module.exports = Applicant;
