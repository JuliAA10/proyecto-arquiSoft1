package handlers

import (
	db "Api_rest/DB"
	models "Api_rest/models"
	"net/http"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		templates.ExecuteTemplate(w, "Registro.html", nil)
		return
	}

	if r.Method == http.MethodPost {
		err := r.ParseForm()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		nombre := r.FormValue("nombre")
		apellido := r.FormValue("apellido")
		mail := r.FormValue("mail")
		tipo := r.FormValue("tipo")
		contraseña := r.FormValue("contraseña")

		newUser := models.NewPersona(nombre, apellido, mail, tipo, contraseña)

		db.Connect()
		defer db.Close()
		if err := newUser.Save(); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		http.Redirect(w, r, "/register", http.StatusSeeOther)
	}
}
