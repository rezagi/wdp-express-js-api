import students from "../data/students.json";
import schools from "../data/schools.json";

export const get_student = (req, res) => {
  const { student_id } = req.params;
  let student = students.find((p) => p.id == student_id);
  let school = schools.find((p) => p.npsn == student.npsn);
  Object.assign(student,{school:school})

  if (student == null) {
    return res.status(404).json({ message: "Data Siswa tidak ditemukan !" });
  }

  return res.status(200).json(student);
};

export const get_students = (req, res) => {
  return res.status(200).json(students);
};

export const add_student = (req, res) => { 
  const { name, npsn, kelas} = req.body;

  let get_school = schools.find((p) => p.npsn == npsn);  
  let get_student = students.find((p) => p.name == name);  

  if (get_student != null) {
    return res.status(404).json({ message: "Nama Siswa duplikat, Periksa kembali !" });
  } 

  else if (get_school == null) {
    return res.status(404).json({ message: "NPSN tidak valid, Periksa kembali !" });
  }  

  else {
    let student = {
      id: students.length + 1,
      name: name,
      npsn: npsn,
      kelas: kelas,
    };

    students.push(student);

    return res.status(201).json(student);
  }
};

export const update_student = (req, res) => {
  const { student_id } = req.params;
  const { name, npsn, kelas } = req.body;

  let student = students.find((p) => p.id == student_id);

  let get_school = schools.find((p) => p.npsn == npsn);  
  let get_student = students.find((p) => p.name == name);  

  if (student == null) {
    return res.status(404).json({ message: "Siswa tidak ditemukan, Periksa kembali !" });
  }

  else if (get_student != null) {
    return res.status(404).json({ message: "Nama Siswa duplikat !" });
  } 

  else if (get_school == null) {
    return res.status(404).json({ message: "NPSN tidak valid, Periksa kembali !" });
  }  

  else {  
    student.name = name;
    student.npsn = npsn;
    student.kelas = kelas;

    return res.status(200).json(student);
  }
};

export const delete_student = (req, res) => {
  const { student_id } = req.params;
  let student = students.find((p) => p.id == student_id);

  if (student == null) {
    return res.status(404).json({ message: "Siswa tidak ditemukan, Periksa kembali !" });
  }

  students.splice(student.index, 1);

  return res.status(200).json({message: "Siswa berhasil di hapus"});
};
