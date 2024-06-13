package handlers

import (
	models "Api_rest/models"
	"log"
	"text/template"
)

var templates *template.Template

func init() {
	var err error
	templates, err = template.ParseFiles("tmp/Login.html", "tmp/Registro.html", "tmp/Pagina.html", "tmp/Admin.html")
	if err != nil {
		log.Fatal(err)
	}
}

type PageData struct {
	Persona   *models.Persona
	Cursos    []models.Curso
	MisCursos []models.Curso
}
