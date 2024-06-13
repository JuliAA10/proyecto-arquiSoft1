package handlers

import (
	db "Api_rest/DB"
	"Api_rest/endpoint"
	models "Api_rest/models"
	"database/sql"
	"net/http"
	"strconv"
)

func Login(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		templates.ExecuteTemplate(w, "Login.html", nil)
		return
	}

	if r.Method == http.MethodPost {
		username := r.FormValue("mail")
		password := r.FormValue("password")

		if checkCredentials(username, password, w) {
			endpoint.Tipo(username, w, r)
		} else {
			http.Error(w, "Credenciales incorrectas", http.StatusUnauthorized)
		}
	}
}

func checkCredentials(username, password string, w http.ResponseWriter) bool {
	db.Connect()
	defer db.Close()

	var storedPassword string
	query := "SELECT contraseña FROM persona WHERE mail = ?"

	row := db.QueryRow(query, username)
	err := row.Scan(&storedPassword)
	if err != nil {
		if err == sql.ErrNoRows {
			return false
		}
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return false
	}

	return storedPassword == password
}

func Menu(w http.ResponseWriter, r *http.Request) {

	if r.Method == http.MethodGet {
		Mail := r.URL.Query().Get("mail") // Asignamos el valor del correo electrónico obtenido de la URL
		db.Connect()
		defer db.Close()

		persona, err := models.ObtenerPersonaPorEmail(Mail)
		if err != nil {
			http.Error(w, "Error al obtener la persona: "+err.Error(), http.StatusInternalServerError)
			return
		}

		cursos, err := models.ObtenerTodosLosCursos()
		if err != nil {
			http.Error(w, "Error al obtener los cursos: "+err.Error(), http.StatusInternalServerError)
			return
		}

		misCursos, err := models.ObtenerCursosDePersona(persona.ID)
		if err != nil {
			http.Error(w, "Error al obtener los cursos de la persona: "+err.Error(), http.StatusInternalServerError)
			return
		}

		// Filtrar los cursos en los que la persona no está inscrita
		cursosDisponibles := filtrarCursosDisponibles(cursos, misCursos)

		data := PageData{
			Persona:   persona,
			Cursos:    cursosDisponibles,
			MisCursos: misCursos,
		}

		templates.ExecuteTemplate(w, "Pagina.html", data)
		return
	}

	if r.Method == http.MethodPost {
		action := r.FormValue("action")
		idPersonaStr := r.FormValue("id_persona")
		cursos := r.Form["curso"]

		idPersona, err := strconv.Atoi(idPersonaStr)
		if err != nil {
			http.Error(w, "ID de persona inválido: "+err.Error(), http.StatusBadRequest)
			return
		}

		db.Connect()
		defer db.Close()

		if action == "inscribir" {
			for _, cursoIDStr := range cursos {
				cursoID, err := strconv.Atoi(cursoIDStr)
				if err != nil {
					http.Error(w, "Error al convertir cursoID: "+err.Error(), http.StatusInternalServerError)
					return
				}

				err = models.InscribirAlumno(idPersona, cursoID)
				if err != nil {
					http.Error(w, "Error al inscribir en curso: "+err.Error(), http.StatusInternalServerError)
					return
				}
			}
		} else if action == "actualizar" {
			var cursoIDs []int
			for _, cursoIDStr := range cursos {
				cursoID, err := strconv.Atoi(cursoIDStr)
				if err != nil {
					http.Error(w, "Error al convertir cursoID: "+err.Error(), http.StatusInternalServerError)
					return
				}
				cursoIDs = append(cursoIDs, cursoID)
			}

			err := models.EliminarInscripciones(idPersona, cursoIDs)
			if err != nil {
				http.Error(w, "Error al eliminar inscripciones: "+err.Error(), http.StatusInternalServerError)
				return
			}
		}

		http.Redirect(w, r, "/pagina?mail="+r.FormValue("mail"), http.StatusSeeOther)
	}
}

func filtrarCursosDisponibles(cursos []models.Curso, misCursos []models.Curso) []models.Curso {
	misCursosMap := make(map[int]bool)
	for _, curso := range misCursos {
		misCursosMap[curso.ID] = true
	}

	var cursosDisponibles []models.Curso
	for _, curso := range cursos {
		if !misCursosMap[curso.ID] {
			cursosDisponibles = append(cursosDisponibles, curso)
		}
	}

	return cursosDisponibles
}
