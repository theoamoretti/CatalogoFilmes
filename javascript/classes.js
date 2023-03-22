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
    constructor(id, titulo, ano, genero, duracao, cartaz, sinopse, direcao, elenco, classificacao, avaliacao, btnDetalhes, btnFav){
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
        this.btnDetalhes=null;
        this.btnFav=null;
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

        this.setBtnDetalhes();
        cardBody.appendChild(this.getBtnDetalhes());

        this.setBtnFav();
        cardBody.appendChild(this.getBtnFav());

        return card;
    }
    
    getDetalhesFilme= () =>{
        let cardDetalhe = document.createElement("div");
        cardDetalhe.setAttribute("class", "card mb-3");
        cardDetalhe.setAttribute("style", "max-width: 540px;");
        let divGeral= document.createElement("div");
        divGeral.setAttribute("class", "row g-0");
        let divImg= document.createElement("div");
        divImg.setAttribute("class", "col-md-4");
        let imgCartaz = document.createElement("img");
        imgCartaz.setAttribute("class", "img-fluid rounded-start");
        imgCartaz.setAttribute("src", this.cartaz);
        let divDet = document.createElement("div");
        divDet.setAttribute("class", "col-md-8");
        let listaDet = document.createElement("div");
        listaDet.setAttribute("class", "card-body");
        let hCardTitle = document.createElement("h5");
        hCardTitle.setAttribute("class", "card-title");
        hCardTitle.appendChild(document.createTextNode(this.titulo));
        let plot = document.createElement("p");
        plot.setAttribute("class", "card-text");
        plot.appendChild(document.createTextNode(this.sinopse));
        let genre = document.createElement("p");
        genre.setAttribute("class", "card-text");
        genre.appendChild(document.createTextNode(this.genero));
        let runtime = document.createElement("p");
        runtime.setAttribute("class", "card-text");
        runtime.appendChild(document.createTextNode(this.duracao));
        let diretor = document.createElement("p");
        diretor.setAttribute("class", "card-text");
        diretor.appendChild(document.createTextNode(this.direcao));
        let atores = document.createElement("p");
        atores.setAttribute("class", "card-text");
        atores.appendChild(document.createTextNode(this.elenco));
        let rating = document.createElement("p");
        rating.setAttribute("class", "card-text");
        rating.appendChild(document.createTextNode(this.classificacao));
        let vote = document.createElement("p");
        vote.setAttribute("class", "card-text");
        vote.appendChild(document.createTextNode(this.avaliacao));

        listaDet.appendChild(hCardTitle)
        listaDet.appendChild(plot)
        listaDet.appendChild(genre)
        listaDet.appendChild(runtime)
        listaDet.appendChild(diretor)
        listaDet.appendChild(atores)
        listaDet.appendChild(rating)
        listaDet.appendChild(vote)
        divImg.appendChild(imgCartaz)
        divDet.appendChild(listaDet)
        divGeral.appendChild(divImg)
        divGeral.appendChild(divDet)
        cardDetalhe.appendChild(divGeral)

        return cardDetalhe;
    }

    setBtnDetalhes = () =>{
        this.btnDetalhes = document.createElement('button');
        this.btnDetalhes.appendChild(document.createTextNode("Detalhes"));
        this.btnDetalhes.setAttribute("id", this.id);
        this.btnDetalhes.setAttribute("class", "btnDetalhesFilme");
    }

    getBtnDetalhes = () =>{
        return this.btnDetalhes;
    }

    setBtnFav = () =>{
        this.btnFav = document.createElement('button');
        this.btnFav.appendChild(document.createTextNode("Favorito"));
        this.btnFav.setAttribute("onclick", "");
    }

    getBtnFav = () =>{
        return this.btnFav;
    }

}

let detalhesFilme = async (id)=>{
    fetch("http://www.omdbapi.com/?apikey=993cfe2a&i="+id)
    .then((resp)=> resp.json())
    .then((resp)=>{
        let filme = new Filme(
            resp.imdbID,
            resp.Title,
            resp.Year,
            resp.Genre.split(","),
            resp.Runtime,
            resp.Poster,
            resp.Plot,
            resp.Director,
            resp.Actors.split(","),
            resp.imdbRating,
            resp.imdbVotes
        );
        console.log(filme.getDetalhesFilme());
        document.querySelector("#mostrar-filme").appendChild(filme.getDetalhesFilme());
        document.querySelector("#lista-filmes").style.display="none";
        document.querySelector("#mostrar-filme").style.display="flex";
    });
    
}

let listarFilmes = async (filmes) => {
    let listaFilmes= await document.querySelector("#lista-filmes");
    listaFilmes.style.display="flex";
    listaFilmes.innerHTML= "";
    document.querySelector("#mostrar-filme").innerHTML= "";
    document.querySelector("#mostrar-filme").style.display="none";
    console.log(listaFilmes);
    if(filmes.length > 0){
        filmes.forEach(async(filme) =>{
            listaFilmes.appendChild(await filme.getCard());
            filme.getBtnDetalhes().onclick=()=>{
                detalhesFilme(filme.id);
            }
        }); 
    }
}