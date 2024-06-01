const express = require("express");
const app = express();
let path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  let file = [];
  fs.readdir("./files", (err, files) => {
    if (err){ console.log(`error in file reading : ${err}`);}
    else {
      file = files;
      res.render("view", { files: file });
    }
  });
});
app.get("/create", (req, res) => {
  res.render("create");
});
app.post("/create", (req, res) => {
  console.log(req.body);
  let head = req.body.heading;
  let filetype = req.body.filetype;
  let desc = req.body.desc;
  let filename = head.split(" ").join("") +'.'+ filetype;
  fs.writeFile("./files/" + filename, desc, (err) => {
    console.log(`error from file writing /create route : ${err}`);
  });
  res.redirect("/");
});

app.get("/show/:filename", (req, res) => {
  let file = req.params.filename;
  fs.readFile("./files/" + file, "utf8", (err, data) => {
    if (err){ console.log(err);}
    res.render("show", { filename: file, filedata: data });
  });
});
app.get("/delete/:filename", (req, res) => {
  let file = req.params.filename;
  let deleted = fs.unlink("./files/" + file, (err) => {
    if (err){ console.log(err);}
  });
  res.render("delete", { file: file });
});
app.get("/rename/:filename", (req, res) => {
  let filename = req.params.filename;
  res.render("rename", { filename: filename });
});
app.post("/rename", (req, res) => {

  ////////// Todo : rename is not working well till now, fix this!
  let filename = req.body.oldname;
  let extIndex = filename.lastIndexOf('.');
  let fileType = filename.substring(extIndex);
  // let newname = req.body.newname;
  fs.rename("./files/"+req.body.oldname,"./files/"+ req.body.newname+fileType, (err) => {
    if (err){ console.log(`error in renameing post /rename route : ${err}`);}
  });
  res.redirect('/');
});

app.listen(3000, () => {
  console.log("check it on : http://localhost:3000");
});
