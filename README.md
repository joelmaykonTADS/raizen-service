# Raizen Services

Desafio da Raizen para implementar um serverless para gerenciamento de um funcionário.

## Instalação

Use o comando abaixo para instalar os pacotes node.

```bash
npm install
```

## Como usar

```
#  - Necessário ter o serverless framework para rodar localmente
# execute o comando abaixo:
npm run dev 

# para executar os testes de cobertura
npm run test

#para executar os teste unitários
npm run tdd
```
## endpoints


### POST 
`https://7hbs0mxh12.execute-api.us-east-1.amazonaws.com/dev/employers` 

**Parâmetros**

|          Nome | Required |  Tipo   | Descrição                                                                                                                                                         |
| -------------:|:--------:|:-------:| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `name` | não | string  | Nome do funcionário.                                                                   |
|`office`| não | string  | Cargo do funcionário.                                                                   |
|`age`| não | number  | Idade do funcionário.                                                                   |

**body**

```
{
    "fullname": "Joel Gulati",
    "office": "developer",
    "age": 13
}

```
**Response**

```
{
    "message": "Sucessfully submitted employer with office developer",
    "employerId": "ca3312234-2nsd230n23-2ml"
}
```
### GET
`https://7hbs0mxh12.execute-api.us-east-1.amazonaws.com/dev/employers`
<a href="https://7hbs0mxh12.execute-api.us-east-1.amazonaws.com/dev/employers" target="_blank">Acessar no navegador</a>

**Response**

```
{
    "employers": [
        {
            "office": "developer",
            "id": "ca3312234-2nsd230n23-2ml",
            "fullname": "Joel Gulati",
            "age": 13
        }
    ]
}
```

### PATCH
`https://7hbs0mxh12.execute-api.us-east-1.amazonaws.com/dev/employers` 

**body**

```
{
    "fullname": "Joel Maykon",
    "id": "2927ea00-absada4-123-a550-asd123123qas",
    "office": "developer",
    "age": 13
}
```
**Response**

```
{
    "message": "Sucessfully update employer with office developer",
    "employerId": "2927ea00-absada4-123-a550-asd123123qas"
}
```

### DELETE
`https://7hbs0mxh12.execute-api.us-east-1.amazonaws.com/dev/employers?id=2927ea00-absada4-123-a550-asd123123qas` 

**Response**

```
{
    "message": "Sucessfully remove employer with office",
    "employerId": "2927ea00-absada4-123-a550-asd123123qas"
}
```

### Importação de arquivo para postman

- Documentação do postman [importando arquivo json](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman)
- Nosso arquivo de importação [raizen JSON](https://github.com/joelmaykonTADS/raizen-service/tree/main/postman)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
