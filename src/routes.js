const {
  addNotesHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require("./handler");

const routes = [
  //route menyimpan catatan
  {
    method: "POST",
    path: "/notes",
    handler: addNotesHandler,
    // routes: {
    //   cors: {
    //     origin: ["*"],
    //   },
    // },
  },

  //route menampilkan Catatan
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },

  //route memilih Catatan
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByIdHandler,
  },

  //Route Mengedit Catatan
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteByIdHandler,
  },

  //Route Menghapus Catatan
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
