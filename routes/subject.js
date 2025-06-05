const { Router } = require("express");
const router = Router();
const { v4: uuid4 } = require("uuid");

const { readData, writeData } = require("../utils/fileHandler");

router.get("/subjects", async (req, res) => {
  try {
    const subjects = await readData("subjects.json");
    res.json(subjects);
  } catch (error) {
    console.log(error);
  }
});

router.get("/subjects/:id", async (req, res) => {
  const subjects = await readData("subjects.json");
  const id =req.params.id;

  const subject= subjects.find((subject1) => subject1.id === id);
  if (!subject) {
    return res.status(404).json({
      error: "Subject not found",
    });
  }
  res.json(subject);
});

router.post("/subjects", async (req, res) => {
  const { SubName, SubTeacher } = req.body;

  const subjects = await readData("subjects.json");
  let id = uuid4();
  console.log(`SubName= ${SubName}`);
  console.log(`SubTeacher= ${SubTeacher}`);
  
if(!SubName || !SubTeacher){
    return res.status(404).json({error:"Fill the empty fields"});
}

  let newSubjects = {
    id,
    SubName,
    SubTeacher,
  };

  subjects.push(newSubjects);
  await writeData("subjects.json", subjects);

  res.status(200).json({
    message: "Subjects added successfully.",
    newSubjects,

  });
});
router.put("/subjects/:id", async (req, res) => {
   const id = req.params.id;
  let subjects = await readData("subjects.json");
  const { SubName,SubTeacher,} = req.body;
  const index = subjects.findIndex((subject1)=> subject1.id === id);
  if (index === -1){
    return res.status(404).json({error:"subject not found"})
  }
  subjects[index]= {
    id:subjects[index].id,
    SubName: !SubName ? SubName[index].SubName : SubName,
    SubTeacher: SubTeacher !== undefined ? SubTeacher: SubTeacher[index].SubTeacher,
  }
  await writeData("subjects.json", subjects) 
  res.status(200)
  .json({message:"subjects updated successfully",subjects})

});


router.delete("/subjects/:id", async (req, res) => {
  const id = req.params.id;
  const subjects = await readData("subjects.json");

  const findSubjects = subjects.find((subject) => subject.id === id);
  console.log(findSubjects);

  if (!findSubjects) {
    return res.status(404).json({ error: "Subjects not found." });
  }

  const newSubject = subjects.filter((subject) => subject.id !== id);

  await writeData("subjects.json", newSubject);
  res
    .status(200)
    .json({ message: "Subjects deleted successfully.", findSubjects });
});

module.exports = router;


