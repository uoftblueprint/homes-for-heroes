const sql = require('./db.js');
const logger = require('../logger');

// Constructor
const UserInfo = function (userInfo) {
  if(userInfo.user_id === undefined)
    throw new Error('User ID must be defined for UserInfo');
  this.user_id = userInfo.user_id;
  this.gender = userInfo.gender;
  this.email = userInfo.email;
  this.applicant_phone = userInfo.applicant_phone;
  this.applicant_dob = userInfo.applicant_dob;
  this.street_name = userInfo.street_name;
  this.curr_level = userInfo.curr_level;
  this.city = userInfo.city;
  this.province = userInfo.province;
  this.referral = userInfo.referral;
};

UserInfo.mutable_attributes = [
  'gender',
  'email',
  'applicant_phone',
  'applicant_dob',
  'street_name',
  'curr_level',
  'city',
  'province',
  'referral'
];

UserInfo.prototype.update = function() {
  return new Promise((resolve, reject) => {
    logger.info('Updating UserInfo for uid %i', this.user_id);
    const available_properties = [];
    const available_values = [];
    for(const attribute of UserInfo.mutable_attributes) {
      if (this[attribute] !== undefined) {
        available_properties.push(`${attribute}=?`);
        available_values.push(this[attribute]);
      }
    }
    available_values.push(this.user_id);
    const query = `UPDATE UserInfo SET ${available_properties.join(', ')} WHERE user_id = ?`;
    sql.query(query, available_values, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = UserInfo;