package handlers

import (
	db "Api_rest/DB"
	models "Api_rest/models"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db.Connect()
	defer db.Close()
	users, err := models.ObtenerTodasLasPersonas()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	output, _ := json.Marshal(users)
	fmt.Fprintln(w, string(output))
}

func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	userID, _ := strconv.Atoi(vars["id"])

	db.Connect()
	defer db.Close()
	user, err := models.ObtenerPersonaPorID(userID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	output, _ := json.Marshal(user)
	fmt.Fprintln(w, string(output))
}

func Administrador(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		db.Connect()
		defer db.Close()
		cursos, err := models.ObtenerTodosLosCursos()
		if err != nil {
			http.Error(w, "Error al obtener los cursos: "+err.Error(), http.StatusInternalServerError)
			return
		}

		data := struct {
			Cursos []models.Curso
		}{
			Cursos: cursos,
		}

		templates.ExecuteTemplate(w, "Admin.html", data)
		return
	}
	if r.Method == http.MethodPost {
		action := r.FormValue("action")

		switch action {
		case "Registrar_Curso":
			nombre := r.FormValue("nombre")
			detalle := r.FormValue("detalle")
			preciostr := r.FormValue("precio")
			horasCursadostr := r.FormValue("horas_cursado")

			precio, err := strconv.ParseFloat(preciostr, 64)
			if err != nil {
				http.Error(w, "Error al convertir el precio a float64: "+err.Error(), http.StatusBadRequest)
				return
			}

			horasCursado, err := strconv.Atoi(horasCursadostr)
			if err != nil {
				http.Error(w, "Error al convertir las horas de cursado a int: "+err.Error(), http.StatusBadRequest)
				return
			}

			nuevoCurso := models.NewCurso(nombre, detalle, precio, horasCursado)
			db.Connect()
			defer db.Close()
			if err := nuevoCurso.SaveCurso(); err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			http.Redirect(w, r, "/admin", http.StatusSeeOther)
		case "Eleminar_Curso":
			cursoIDs := r.Form["curso"]

			db.Connect()
			defer db.Close()

			for _, cursoIDStr := range cursoIDs {
				cursoID, err := strconv.Atoi(cursoIDStr)
				if err != nil {
					http.Error(w, "Error al convertir el ID del curso: "+err.Error(), http.StatusBadRequest)
					return
				}

				if err := models.DeleteCursoByID(cursoID); err != nil {
					http.Error(w, "Error al eliminar el curso: "+err.Error(), http.StatusInternalServerError)
					return
				}
			}
			http.Redirect(w, r, "/admin", http.StatusSeeOther)
		}
	}
}
