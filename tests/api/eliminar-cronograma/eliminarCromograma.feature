Feature: Eliminar Cronograma
    Como usuario de la plataforma
    Quiero eliminar un Cronograma
    Para organizar limpiar cosas

    Scenario: Eliminar cronograma en graphql

        Given quiero eliminar un cronograma
        When envio la peticion con el id 405
        Then el codigo de respuest debe ser 200