if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI: "mongodb://Afej:<DBpassword>@ds119164.mlab.com:19164/cgpa-analyzer"
  };
} else {
  module.exports = {
    mongoURI: "mongodb://localhost/cgpa-analyzer"
  };
}
