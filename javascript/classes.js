class Ator{
    constructor(id, nome){
        this.nome=nome;
        this.id=id;
    }
}
class Diretor{
    constructor(id, nome){
        this.nome=nome;
        this.id=id
    }
}
class Filme{
    constructor(id, titulo, ano, genero, duracao, cartaz, sinopse, direcao, elenco, classificacao, avaliacao){
        this.id=id;
        this.titulo=titulo;
        this.ano=ano;
        this.genero=genero;
        this.duracao=duracao;
        this.cartaz=cartaz;
        this.sinopse=sinopse;
        this.direcao=direcao;
        this.elenco=elenco;
        this.classificacao=classificacao;
        this.avaliacao=avaliacao;
    }
}

getCard = async () =>{
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    let imgCartaz = document.createElement("img");
    imgCartaz.setAttribute("class", "card-img-top");
    imgCartaz.setAttribute("src", this.cartaz);
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    let hCardTitle = document.createElement("h5");
    hCardTitle.setAttribute("class", "card-title");
    let divDetalhes = document.createElement("div");
    divDetalhes.setAttribute("style", "display:flex; justify-content:space-around;");
    let divGenero = document.createElement("div");
    divGenero.setAttribute("style", "flex-grow:1;");
    let divAno = document.createElement("div");
    divAno.setAttribute("style", "flex-grow:1;");
    let divClassificacao = document.createElement("div");
    divClassificacao.setAttribute("style", "flex-grow:1;");
    hCardTitle.appendChild(document.createTextNode(this.titulo));
    divGenero.appendChild(document.createTextNode(this.genero));
    divAno.appendChild(document.createTextNode(this.ano));
    divClassificacao.appendChild(document.createTextNode(this.classificacao));
    divDetalhes.appendChild(divGenero);
    divDetalhes.appendChild(divAno);
    divDetalhes.appendChild(divClassificacao);
    card.appendChild(imgCartaz);
    card.appendChild(cardBody);
    cardBody.appendChild(hCardTitle);
    cardBody.appendChild(divDetalhes);
    return card;
}

let listarFilmes = async (filmes) => {
    let listaFilmes= await document.querySelector("#lista-filmes");
    listaFilmes.innerHTML = "";
    console.log(listaFilmes);
    if(filmes.length > 0){
        filmes.forEach(async(filme) =>{
            listaFilmes.appendChild(await filme.getCard());
        }); 
    }
}