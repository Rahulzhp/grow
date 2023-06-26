const mongoose = require("mongoose");

const ProjectShema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }

})

const ProjectModel = mongoose.model("techproject", ProjectShema)

module.exports = {
    ProjectModel
}