package main

import (
	"log"
	"net/http"

	handlers "Api_rest/Handlers"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	fs := http.FileServer(http.Dir("./tmp/CSS"))
	router.PathPrefix("/CSS/").Handler(http.StripPrefix("/CSS/", fs))

	imgFs := http.FileServer(http.Dir("./tmp/CSS/Images"))
	router.PathPrefix("/Images/").Handler(http.StripPrefix("/Images/", imgFs))

	router.HandleFunc("/", handlers.Login).Methods("GET", "POST")
	router.HandleFunc("/register", handlers.CreateUser).Methods("GET", "POST")
	router.HandleFunc("/pagina", handlers.Menu).Methods("GET", "POST")
	router.HandleFunc("/admin", handlers.Administrador).Methods("GET", "POST")

	router.NotFoundHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/", http.StatusSeeOther)
	})

	log.Println("Servidor iniciado en http://localhost:8000")
	log.Fatal(http.ListenAndServe(":8000", router))
}
