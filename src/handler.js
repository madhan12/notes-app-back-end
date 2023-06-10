const { nanoid } = require("nanoid");
const { notes } = require("./notes");

const addNotesHandler = (request, h) => {
  //menangkap data dari Client
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  //fungsi menampung smw variable
  const newNote = { title, tags, body, id, createdAt, updatedAt };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  //kondisi jika suksess
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Data Berhasil Di tambahkan",
      data: {
        noteId: id,
      },
    });
    //response code kalau berhasil
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Data Gagal di tambahkan",
  });

  // response.header("Access-Control-Allow-Origin", "*");
  response.code(500);
  return response;
};

//menampilkan semua catatan
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

//menampilkan catatan by ID
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

//Mengedit Catatan dengan menangkat ID
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    //response
    const response = h.response({
      status: "success",
      message: "Data berhasil di Perbaharui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Data Gagal di Perbaharui",
  });
  response.code(404);
  return response;
};

//Menghapus Catatan
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Data Berhasil di Hapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Data Gagal di Hapus",
  });
  response.code(404);
  return response;
};

// console.error(addNoteHandler);

//exports module
module.exports = {
  addNotesHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
