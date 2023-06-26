const express = require("express")

const { ProjectModel } = require("../Model/post")

const projectRoute = express.Router()


projectRoute.get("/", async (req, res) => {
    try {
        let post = await ProjectModel.find()
        res.send({ post })
    } catch (err) {
        res.send({ "err": "Something went wrong" })
    }
})
projectRoute.post("/add", async (req, res) => {
    let data = req.body
    try {
        let project = new ProjectModel(data)
        await project.save()
        res.send({ msg: "data added", project })

    } catch (er) {
        console.log("er", er)
    }
})

projectRoute.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        const data = await ProjectModel.findByIdAndUpdate({ _id: id }, payload);
        res.send(data);
    } catch (err) {
        res.send(err);
    }
});

projectRoute.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const data = await ProjectModel.findByIdAndDelete({ _id: id });
        res.send({ msg: "deleted" });
    } catch (err) {
        res.send(err);
    }
});

module.exports = {
    projectRoute
}