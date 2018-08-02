var api = {
    people: 'https://swapi.co/api/people/',
    films: 'https://swapi.co/api/films/'
};

function chargePage(){
    var people = $(".clckPeople")
    var film = $(".clckFilms")

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

    printElse()
    
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
            var peopleUrl = people[i]
            var thisUrl = $(this)[0].id
            if(thisUrl === peopleUrl.url){
                containerDetailPeople += templateDetailPeople
                        .replace('__idAccountant__', accountant++)
                        .replace('__people-name__', people[i].name)
                        .replace('__people-height__', people[i].height)
                        .replace('__people-eye__', people[i].eye_color)
                        .replace('__people-hair__', people[i].hair_color)
                        .replace('__people-gender__', people[i].gender)
                        .replace('__people-birthday__', people[i].birth_year)
                        $("#detail-info").html(containerDetailPeople)
                e.preventDefault()
            }
            else{
                e.preventDefault()
            }
        }
        $(".img-placeholder").hide()
        $(".infoFilms").hide()
    })
}

function printFilms(films){
    containerFilms = ""
    var templateFilms =
        '<div class="img-film">' +
            '<img src="https://yt3.ggpht.com/a-/ACSszfEXV-31PV4_jgs8cUjxTIl0--Ganl9jFst10w=s900-mo-c-c0xffffffff-rj-k-no" alt="img-films" name="img-films">' +
            '<div class="placeholder-film">' +
                '<p class="title-film text-film" id="__idFilm__">__title__</p>' +
                '<p class="episode-film text-film">__episode__</p>' +
                '<p class="release-film text-film">__release__</p>' +
            '</div>' +
        '</div>'
    films.forEach(function(film, index){
        containerFilms += templateFilms.replace('__idFilm__', films[index].url)
            .replace('__title__', films[index].title)
            .replace('__episode__', films[index].episode_id)
            .replace('__release__', films[index].release_date)
    })
    $("#films").html(containerFilms)

    var containerDetailFilms = ""
    var accountant = 0
    var templateDetailFilms = 
        '<div id="infoFilms">' +
            '<h3>DETAILS:</h3>' +
            '<p>Title: <span class="title-film">__title-film__</span></p>' +
            '<p>Episode: <span class="episode-film">__episode-film__</span></p>' +
            '<p>Producer: <span class="producer-film">__producer-film__</span></p>' +
            '<p>Relase date: <span class="release-film">__release-film__</span></p>' +
            '<ul class="ulList">' +
                '<li><a href="#">Related character</a></li>' +
                '<li><a href="#">Related planets</a></li>' +
                '<li><a href="#">Related starships</a></li>' +
                '<li><a href="#">Related vehicles</a></li>' +
                '<li><a href="#">Related species</a></li>' +
            '</ul>' +
        '</div>'
    $(".img-film").on('click', function(e){
        console.log(this.childNodes[1].childNodes[0].id)
        for(var j=0; j < films.length; j++){
            var filmsUrl = films[j].url
            var thisUrl = this.childNodes[1].childNodes[0].id
            if(thisUrl === filmsUrl){
                console.log(films)
                containerDetailFilms += templateDetailFilms
                        .replace('__title-film__', films[j].title)
                        .replace('__episode-film__', films[j].episode_id)
                        .replace('__producer-film__', films[j].producer)
                        .replace('__release-film__', films[j].release_date)
            $(".img-placeholder").hide()
            $("#infoPeople").hide()
            $("#detail-info").html(containerDetailFilms)
                e.preventDefault()
            }
            else{
                e.preventDefault()
            }
        }
    })

}

function printElse(){
    $(".clckElse").on('click', function(){
        var containerElse = ""
        var templateElse = 
        '<div id="infoElse">' +
            '<p>Very soon you will see the data of <span>__extraDetail__</span></p>' +
        '</div>'
        console.log($(this)[0].name)
        containerElse += templateElse.replace('__extraDetail__', $(this)[0].name)
        $(".img-placeholder").hide()
        $("#detail-info").html(containerElse)
    })
}
$(document).ready(chargePage());