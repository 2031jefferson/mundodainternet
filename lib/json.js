exports.cadastro = (id, username, pushname)=> {
    return `
    \{
       "info" : \[
                    "id" : "${id}", 
                    "username" : "${username}",
                    "mensagensRecebidas" : 0,
                    "numero" : 0, 
                    "nomeWhatsapp" : "${pushname}",
                \]
       "dadosuser" : \[ 
                        "nome" : "",
                        "sobreNome" : "",
                        "ultimoNome" : "",
                        "idade" : 0,
                        "sexo" : "Prefiro não dizer",
                        "paisNacionalidade" : "Brasil",
                        "etnia" : "Prefiro não dizer"
                     \]
    \}
    `
}