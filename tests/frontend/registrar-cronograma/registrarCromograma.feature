Feature: Registrar Cronograma
    Como usuario de la plataforma tomanotas.finanzas.fun
    Quiero crear un Cronograma
    Para organizar mis actividades

    Scenario: Crear cronograma con mi usuario

        Given soy usuario de la plaforma con usuario "Lobaton2020" y contraseña "amoprogramar"
        And selecciono en submenu de cronogramas
        When registro un nuevo cronograma con titulo "Prueba andres, CUCUMBER V2"
        Then el registro queda guardado en bd con nombre "Prueba andres, CUCUMBER V2"