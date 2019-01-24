# 5a8ExternManager
Back pour la gestion des externes. Voici les paths:

1. /api/v1/event
    1. GET: Obtient la liste des 5@8
    2. POST: Ajoute un 5@8, par défault le jeudi prochain
        
2. /api/v1/event/{id}
    1. GET: Obtient les externes du 5@8 correspondant à l'id
    2. POST: Ajoute une entrée d'externe dans le 5@8 correspondant à l'id avec les paramètres body (urlencoded):
        1. cip1
        2. cip2
        3. externName