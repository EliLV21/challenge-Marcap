var api = {
    people: 'https://swapi.co/api/people/',
    films: 'https://swapi.co/api/films/'
};

function chargePage(){
    var people = $("#clckPeople")
    var film = $("#clckFilms")

    people.on('click', function(e){
        $("#films").hide()
        $("#infoFilms").hide()
        $("#people").show()
        if(people[0].className === 'active'){
            e.preventDefault()
        }
        else{
            $.getJSON(api.people, function(response, index){
                var people = response.results
                printPeople(people)
            })
            
        }
        $(this).addClass('active')
    })


    film.on('click', function(e){
        $("#films").show()
        $("#people").hide()
        $("#infoPeople").hide()
        if(film[0].className === 'active'){
            e.preventDefault()
        }
        else{
            $.getJSON(api.films, function(response){
                var films = response.results
                printFilms(films)
            })
        }
        $(this).addClass('active')
    })
    
}

function printPeople(people){
    var containerPeople = ""
    var accountant = 0
    var templateImgPeople =  
        '<div class="detail-name">' +
            '<img src="https://yt3.ggpht.com/a-/ACSszfEXV-31PV4_jgs8cUjxTIl0--Ganl9jFst10w=s900-mo-c-c0xffffffff-rj-k-no" style="border-radius: 50%;" class="img-people" alt="img-people" name="img-people">' +
            '<div class="placeholder-name">' +
            '<p class="people-name text-film" id="__idAccountant__" name="__name__"><a href="#">__namePeople__</a></p>' +
            '</div>' +
        '</div>'
    people.forEach(function(person, index) {
        containerPeople += templateImgPeople.replace('__namePeople__', people[index].name)
                                    .replace('__name__', people[index].name)
                                    .replace('__idAccountant__', people[index].url)
    });
    $("#people").html(containerPeople)

    var containerDetailPeople = ""
    var accountant = 0
    var templateDetailPeople = 
        '<div id="infoPeople">' +
            '<h3>PEOPLE DETAIL:</h3>' +
            '<p>Name: <span class="people-name people__idAccountant__">__people-name__</span></p>' +
            '<p>Height: <span class="people-height">__people-height__</span></p>' +
            '<p>Eye color: <span class="people-eye">__people-eye__</span></p>' +
            '<p>Hair color: <span class="people-hair">__people-hair__</span></p>' +
            '<p>Gender: <span class="people-gender">__people-gender__</span></p>' +
            '<p>Birthday: <span class="people-birthday">__people-birthday__</span></p>' +
            '<ul class="ulList">' +
                '<li><a href="#">Related character</a></li>' +
                '<li><a href="#">Related planets</a></li>' +
                '<li><a href="#">Related starships</a></li>' +
                '<li><a href="#">Related vehicles</a></li>' +
                '<li><a href="#">Related species</a></li>' +
            '</ul>' +
        '</div>'

    $(".people-name").on('click', function(e){
        for(i=0; i < people.length; i++){
            for( j=0; j < $(this).length; j++){
                var peopleUrl = people[i]
                var thisUrl = $(this)[j]
                if(thisUrl.id === peopleUrl.url){
                    containerDetailPeople += templateDetailPeople
                            .replace('__idAccountant__', accountant++)
                            .replace('__people-name__', people[j].name)
                            .replace('__people-height__', people[j].height)
                            .replace('__people-eye__', people[j].eye_color)
                            .replace('__people-hair__', people[j].hair_color)
                            .replace('__people-gender__', people[j].gender)
                            .replace('__people-birthday__', people[j].birth_year)
                    console.log($("#detail-info"))
                $("#detail-info").html(containerDetailPeople)
                 e.preventDefault()
                }
                else{
                    e.preventDefault()
                }
            }
        }
    })
}

function printFilms(films){
    containerFilms = ""
    var templateFilms =
        '<div class="img-film">' +
            '<img src="https://yt3.ggpht.com/a-/ACSszfEXV-31PV4_jgs8cUjxTIl0--Ganl9jFst10w=s900-mo-c-c0xffffffff-rj-k-no" alt="img-films" name="img-films">' +
            '<div class="placeholder-film">' +
                '<p class="title-film text-film __classFilm__">__title__</p>' +
                '<p class="episode-film text-film">__episode__</p>' +
                '<p class="release-film text-film">__release__</p>' +
            '</div>' +
        '</div>'
    films.forEach(function(film, index){
        containerFilms += templateFilms.replace('__classFilm__', films[index].url)
            .replace('__title__', films[index].title)
            .replace('__episode__', films[index].episode_id)
            .replace('__release__', films[index].release_date)
    })
    $("#films").html(containerFilms)

    var containerDetailFilms = ""
    var accountant = 0
    var templateDetailFilms = 
        '<h3>DETAILS:</h3>' +
        '<p>Title: <span class="title-film" id="__idFilm__">__title-film__</span></p>' +
        '<p>Episode: <span class="episode-film">__episode-film__</span></p>' +
        '<p>Producer: <span class="producer-film">__producer-film__</span></p>' +
        '<p>Relase date: <span class="release-film">__release-film__</span></p>' +
        '<ul class="ulList">' +
            '<li><a href="#">Related character</a></li>' +
            '<li><a href="#">Related planets</a></li>' +
            '<li><a href="#">Related starships</a></li>' +
            '<li><a href="#">Related vehicles</a></li>' +
            '<li><a href="#">Related species</a></li>' +
        '</ul>'

    $(".img-film").on('click', function(e){
        for(var i=0; i < films.length; i++){
            for(var j=0; j < $(this).length; j++){
                var filmsUrl = films[j]
                var thisUrl = $(this)[i]
                console.log(filmsUrl)
                if(thisUrl.id === filmsUrl.url){
                    containerDetailFilms += templateDetailFilms.replace('__idFilm__', films[j].url)
                            .replace('__tittle-film__', films[j].name)
                            .replace('__episode-film__', films[j].height)
                            .replace('__producer-film__', films[j].eye_color)
                            .replace('__release-film__', films[j].hair_color)
                 $("#detail-info").html(containerDetailFilms)
                 e.preventDefault()
                }
                else{
                    e.preventDefault()
                }
            }
        }
    })

}

$(document).ready(chargePage());