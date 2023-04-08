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
        divDetalhes.setAttribute("class", "divDetalhes");
        let divGenero = document.createElement("div");
        divGenero.setAttribute("style", "flex-grow:1;");
        let divAno = document.createElement("div");
        divAno.setAttribute("style", "flex-grow:1;");
        let divClassificacao = document.createElement("div");
        divClassificacao.setAttribute("style", "flex-grow:1;");
        hCardTitle.appendChild(document.createTextNode(this.titulo));
        divGenero.appendChild(document.createTextNode("Gênero: "+this.genero));
        divAno.appendChild(document.createTextNode("Ano: "+this.ano));
        divClassificacao.appendChild(document.createTextNode("Duração: "+this.duracao));
        divDetalhes.appendChild(divGenero);
        divDetalhes.appendChild(divAno);
        divDetalhes.appendChild(divClassificacao);
        card.appendChild(imgCartaz);
        card.appendChild(cardBody);
        cardBody.appendChild(hCardTitle);
        cardBody.appendChild(divDetalhes);


        this.setBtnDetalhes();
        cardBody.appendChild(this.getBtnDetalhes());

        this.setBtnRemover();
        cardBody.appendChild(this.getbtnRemover());

        return card;
    }
    
    getDetalhesFilme= () =>{
        let cardDetalhe = document.createElement("div");
        cardDetalhe.setAttribute("class", "card mb-4 carddet");
        let divGeral= document.createElement("div");
        divGeral.setAttribute("class", "row divgeral");
        let divImg= document.createElement("div");
        divImg.setAttribute("class", "divimg col-4");
        let imgCartaz = document.createElement("img");
        imgCartaz.setAttribute("class", "img-fluid rounded-start");
        imgCartaz.setAttribute("src", this.cartaz);
        let divDet = document.createElement("div");
        divDet.setAttribute("class", "divdet col-8");
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
        genre.appendChild(document.createTextNode("Gênero: "+this.genero));
        let runtime = document.createElement("p");
        runtime.setAttribute("class", "card-text");
        runtime.appendChild(document.createTextNode("Duração: "+this.duracao));
        let diretor = document.createElement("p");
        diretor.setAttribute("class", "card-text");
        diretor.appendChild(document.createTextNode("Direção: "+this.direcao));
        let atores = document.createElement("p");
        atores.setAttribute("class", "card-text");
        atores.appendChild(document.createTextNode("Elenco: "+this.elenco));
        let rating = document.createElement("p");
        rating.setAttribute("class", "card-text");
        rating.appendChild(document.createTextNode("Classificação: "+this.classificacao));
        let vote = document.createElement("p");
        vote.setAttribute("class", "card-text");
        vote.appendChild(document.createTextNode("Classificação: "+this.avaliacao));

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

        let btnSalvar=document.createElement('button')
        btnSalvar.appendChild(document.createTextNode('Salvar'))
        btnSalvar.setAttribute('id', 'btnSalvar')
        btnSalvar.setAttribute('class', 'btn btn-primary col-2 mt-3')
        cardDetalhe.appendChild(btnSalvar)

        let btnFechar=document.createElement('button')
        btnFechar.appendChild(document.createTextNode('Voltar'))
        btnFechar.setAttribute('id', 'btnFechar')
        btnFechar.setAttribute('class', 'btn btn-primary col-2 mb-4 mt-2')
        cardDetalhe.appendChild(btnFechar)

        return cardDetalhe;
    }

    setBtnDetalhes = () =>{
        this.btnDetalhes = document.createElement('button');
        this.btnDetalhes.appendChild(document.createTextNode("Detalhes"));
        this.btnDetalhes.setAttribute("id", this.id);
        this.btnDetalhes.setAttribute("class", "btn btn-primary btn-sm");
    }

    getBtnDetalhes = () =>{
        return this.btnDetalhes;
    }

    setBtnRemover = () =>{
        this.btnRemover = document.createElement('button');
        this.btnRemover.appendChild(document.createTextNode("Remover"));
        this.btnRemover.setAttribute("id", this.id);
        this.btnRemover.setAttribute("class", "btn det btn-primary btn-sm");
    }

    getbtnRemover = () =>{
        return this.btnRemover;
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

        document.querySelector("#btnFechar").onclick = ()=>{
            document.querySelector("#lista-filmes").style.display="flex";
            document.querySelector("#mostrar-filme").innerHTML="";
            document.querySelector("#mostrar-filme").style.display="none";
        };

        document.querySelector("#btnSalvar").onclick = ()=>{
            salvarFilme(filme);
        };

        document.querySelector("#lista-filmes").style.display="none";
        document.querySelector("#mostrar-filme").style.display="flex";

    });
    
}

let listarFavoritos = () =>{
let filmesFavoritos=localStorage.getItem('filmesFavoritos');
filmesFavoritos=JSON.parse(filmesFavoritos);
let filmes= new Array();
filmesFavoritos.forEach((item)=>{
    let filme = new Filme(
        item.id,
        item.titulo,
        item.ano,
        item.genero,
        item.duracao,
        item.cartaz,
        item.direcao,
        item.elenco,
        item.classificacao,
        item.avaliacao
    )
    filmes.push(filme);
})
listarFilmes(filmes)
}

let salvarFilme = (filme)=>{
    let filmesString = localStorage.getItem('filmesFavoritos');
    
    if(filmesString){
    var filmes=JSON.parse(filmesString)
    console.log(filmesString)
        filmes.push(filme);
    }else{
        filmes=[filme]
    }
    localStorage.setItem('filmesFavoritos',JSON.stringify(filmes))
    filmes=JSON.stringify(filmes);
    localStorage.setItem('filmesFavoritos', filmes)
    let navFavoritos= document.querySelector("#nav-favoritos")
    navFavoritos.onclick = () =>{
    listarFavoritos();
    }
    
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
            filme.getbtnRemover().onclick=()=>{
                removerFilme(filme.id)
            }

        }); 
    }
    let removerFilme = (filme) =>{
        
        console.log(filmes.splice(filme.id,1))
    }
}

