const sinon = require("sinon");
const mongoose = require("mongoose");
const expect = require("chai").expect;
const User = require("../models/user");
const UserController = require("../controllers/user");
const { describe } = require("mocha");

describe("User Controller - Status", function () {
  before(function (done) {
    mongoose
      .connect(
        "mongodb+srv://kamrankamilli:F4GjX8cDWFpcrJmW@ecommerce-nodejs.leb0aoj.mongodb.net/test-messages?retryWrites=true&w=majority"
      )
      .then((result) => {
        const user = new User({
          email: "test@test.com",
          password: "tester",
          name: "Test",
          posts: [],
          _id: "63d79f540eeb501ef2ae1c0c",
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });
  
  it("should send a response with a valid user status for an existing user", function (done) {
    const req = { userId: "63d79f540eeb501ef2ae1c0c" };
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      },
    };

    UserController.getStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.userStatus).to.be.equal("I am new!");
      done();
    });
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
