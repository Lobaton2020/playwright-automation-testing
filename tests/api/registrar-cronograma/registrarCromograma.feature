Feature: Registrar Cronograma
    Como usuario de la plataforma tomanotas.finanzas.fun
    Quiero crear un Cronograma
    Para organizar mis actividades

    Scenario: Crear cronograma en graphql

        Given quiero reqgistrar un cronograma con el titulo "Prueba andres desde API v3"
        And con la fecha actual
        When doy a registrar
        Then el codigo de respuesta debe ser 200
        And un mensaje "OK"