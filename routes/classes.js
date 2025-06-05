const { Router } = require("express");
const router = Router();
const { v4: uuid4 } = require("uuid");

const { readData, writeData } = require("../utils/fileHandler");

router.get("/classes", async (req, res) => {
  try {
    const classes = await readData("classes.json");
    res.json(classes);
  } catch (error) {
    console.log(error);
  }
});
router.get("/classes/:id", async (req, res) => {
  const classes = await readData("classes.json");
  const id = req.params.id;

  const singleclass = classes.find((classes) => classes.id === id);
  if (!singleclass) {
    return res.status(404).json({
      error: "class not found",
    });
  }
  res.json(singleclass);
});

router.post("/classes", async (req, res) => {
    const {className,numOfStu, attendance} = req.body;
    const classes = await readData("classes.json");

 if (className || numOfStu || attendance ===""){
   return res.json({error : "fill the empty fields"});
}

  let id = uuid4();

  let newClasses = {
    id,
    className,
    numOfStu,
    attendance
  };
  classes.push(newClasses);
  await writeData("classes.json", classes);

  res.status(200).json({
    message: "Class added successfully.",
    newClasses

  });
});
router.put("/classes/:id", async (req, res) => {
   const id = req.params.id;
  let classes = await readData("classes.json");
  const { className,numOfStu, attendance} = req.body;

  const index = classes.findIndex((class1)=> class1.id === id);
  if (index === -1){
    return res.status(404).json({error:"class not found"})
  }
  classes[index]= {
    id: classes[index].id,
    numOfStu: !numOfStu ? numOfStu[index].numOfStu :numOfStu,
    attendance: attendance !== undefined ? attendance: attendance[index].attendance,
    className: className !== undefined ? className: className[index].className
  }
  await writeData("classes.json", classes) 
  res.status(200)
  .json({message:"classes updated successfully",classes})

});


router.delete("/classes/:id", async (req, res) => {
  const id = req.params.id;
  const classes = await readData("classes.json");

  const findclasses = classes.find((class1) => class1.id === id);
  console.log(findclasses);

  if (!findclasses) {
    return res.status(404).json({ error: "class not found." });
  }

  const newClasses = classes.filter((class1) => class1.id !== id);

  await writeData("classes.json", newClasses);
  res
    .status(200)
    .json({ message: "classes deleted successfully.", findclasses });
});

module.exports = router;
