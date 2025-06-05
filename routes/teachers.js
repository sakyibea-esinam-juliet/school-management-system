const { Router } = require("express");
const router = Router();
const { v4: uuid4 } = require("uuid");

const { readData, writeData } = require("../utils/fileHandler");

router.get("/teachers", async (req, res) => {
  try {
    const teachers = await readData("teachers.json");
    res.json(teachers);
  } catch (error) {
    console.log(error);
  }
});
router.get("/teachers/:id", async (req, res) => {
  const teachers = await readData("teachers.json");
  const id = req.params.id;

  const teacher = teachers.find((teacher) => teacher.id === id);
  if (!teacher) {
    return res.status(404).json({
      error: "Teacher not found",
    });
  }
  res.json(teacher);
});

router.post("/teachers", async (req, res) => {
  const { name, age, gender, className } = req.body;

  const teachers = await readData("teachers.json");
  let id = uuid4();
if (age || name || gender || className ==="")
   return res.json({error : "fill the empty fields"});
  let newTeachers = {
    id,
    name,
    age,
    gender,
    className,
  };
  teachers.push(newTeachers);
  await writeData("teachers.json", teachers);

  res.status(200).json({
    message: "Teacher added successfully.",
    newTeachers,
  });
});
router.put("/teachers/:id", async (req, res) => {
   const id = req.params.id;
  let teachers = await readData("teachers.json");
  const { name, gender, age,className} = req.body;
  const index = teachers.findIndex((teacher)=> teacher.id === id);
  if (index === -1){
    return res.status(404).json({error:"teacher not found"})
  }
  teachers[index]= {
    id: teachers[index].id,
    name: !name ? teachers[index].name : name,
    age: age !== undefined ? age: age[index].age,
    gender: gender !== undefined ? gender: gender[index].gender,
    className: className !== undefined ? className: className[index].className
  }
  await writeData("teachers.json", teachers) 
  res.status(200)
  .json({message:"teacher updated successfully",teachers})

});


router.delete("/teachers/:id", async (req, res) => {
  const id = req.params.id;
  const teachers = await readData("teachers.json");

  const findTeacher = teachers.find((teacher) => teacher.id === id);
  console.log(findTeacher);

  if (!findTeacher) {
    return res.status(404).json({ error: "Teacher not found." });
  }

  const newTeacher = teachers.filter((Teacher) => Teacher.id !== id);

  await writeData(".json", newTeacher);
  res
    .status(200)
    .json({ message: "Teacher deleted successfully.", findTeacher });
});

module.exports = router;
