Feature: Registrar Link
    Como usuario de la plataforma tomanotas.finanzas.fun
    Quiero crear un link
    Para organizar mis pendientes

    Scenario: Crear link con mi usuario

        Given soy usuario de la plaforma con usuario de "Lobaton2020" y contraseña "amoprogramar"
        When registro un nuevo link con titulo "Link test kukumber"
        And el link es "https://app.quicktype.ioa/"
        Then el registro queda guardado en bd con link "Link test kukumber"