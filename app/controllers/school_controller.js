import schools from "../data/schools.json";

export const get_school = (req, res) => {
  const { school_id } = req.params;
  let school = schools.find((p) => p.npsn == school_id);

  if (school == null) {
    return res.status(404).json({ message: "Sekolah tidak ditemukan, Periksa kembali !" });
  }

  return res.status(200).json(school);
};

export const get_schools = (req, res) => {
  return res.status(200).json(schools);
};

