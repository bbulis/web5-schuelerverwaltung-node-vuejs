# web5-schuelerverwaltung-node-vuejs
## Aufgabenstellung

Die Aufgabenstellung war es die beiden ersten Übungen zusammenzuführen und diese dann lauffähig in zwei seperaten System zu entwickeln.

## Übersicht der Entwicklung
Aufteilung in Backend und Frontend. Zusätzlich gibt es noch eine Datenbank welche in Docker aufgesetzt ist. 

## Übersicht Endpoints

> | Endpoint            | Beschreibung                                              | Input                                    | Output                                    | HTTP-Methode |
> | ------------------- | --------------------------------------------------------- | ---------------------------------------- | ----------------------------------------- | ------------ |
> | ```/schueler```     | Gibt alle Schüler zurück                                  | -                                        | Array von Schülern                        | ```GET```    |
> | ```/schueler/:id``` | Gibt einen bestimmten Schüler zurück                      | ```id```                                 | Schüler-Objekt                            | ```GET```    |
> | ```/schueler```     | Erstellt einen neuen Schüler                              | ```firstname, lastname, klasse, zweig``` | Schüler-Objekt wenn erstellt              | ```POST```   |
> | ```/schueler/:id``` | Löscht einen bestimmten Schüler                           | ```id```                                 | Bestätigung                               | ```DELETE``` |
> | ```/reset```        | Setzt die Datenbank zurück und erstellt zwei neue Schüler | -                                        | Array von neuen Schülern                  | ```GET```    |
> | ```/testing```      | Testet die Verbindung zur Datenbank                       | -                                        | Gibt eine Meldung zurück wenn erfolgreich | ```GET```    |
