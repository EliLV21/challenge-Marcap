var api = {
    people: 'https://swapi.co/api/people/',
    films: 'https://swapi.co/api/films/'
};

function chargePage(){
    var people = $("#clckPeople")
    var film = $("#clckFilms")

    people.on('click', function(e){
        $("#films").hide()
        $("#people").show()
        if(people[0].className === 'active'){
            e.preventDefault()
        }
        else{
            $.getJSON(api.people, function(response){
                var people = response.results
                printPeople(people)
                printDetailPeople(people)
            })
        }
        $(this).addClass('active')
    })

    film.on('click', function(e){
        $("#films").show()
        $("#people").hide()

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
            '<p class="people-name text-film" id="people__idAccountant__"><a href="#">__namePeople__</a></p>' +
            '</div>' +
        '</div>'
    people.forEach(function(person, index) {
        containerPeople += templateImgPeople.replace('__namePeople__', people[index].name)
                                    .replace('__idAccountant__', accountant++)
    });
    $("#people").html(containerPeople)
}

function printDetailPeople(people){
    console.log('hola')
    var containerDetailPeople = ""
    var accountant = 0
    var templateDetailPeople = 
        '<h3>PEOPLE DETAIL:</h3>' +
        '<p>Name: <span class="people-name" id="name__idAccountant__">__people-name__</span></p>' +
        '<p>Height: <span class="people-height">__people-height__</span></p>' +
        '<p>Eye color: <span class="people-eye">__people-eye__</span></p>' +
        '<p>Hair color: <span class="people-hair">__people-hair__</span></p>' +
        '<p>Gender: <span class="people-gender">__people-gender__</span></p>' +
        '<p>Birthday: <span class="people-birthday">__people-birthday__</span></p>' +
        '<ul>' +
            '<li><a href="#">Related character</a></li>' +
            '<li><a href="#">Related planets</a></li>' +
            '<li><a href="#">Related starships</a></li>' +
            '<li><a href="#">Related vehicles</a></li>' +
            '<li><a href="#">Related species</a></li>' +
        '</ul>'
        people.forEach(function(person, index){
            containerDetailPeople += templateDetailPeople.replace('__idAccountant__', accountant++)
                                    .replace('__people-name__', people[index].name)
                                    .replace('__people-height__', people[index].height)
                                    .replace('__people-eye__', people[index].eye_color)
                                    .replace('__people-hair__', people[index].hair_color)
                                    .replace('__people-gender__', people[index].gender)
                                    .replace('__people-birthday__', people[index].birth_year)

        })
        console.log($(".detail-people"))
        //$(".detail-people").html(containerDetailPeople)

}

function printFilms(films){
    containerFilms = ""
    var templateFilms =
        '<div class="img-film">' +
            '<img src="https://yt3.ggpht.com/a-/ACSszfEXV-31PV4_jgs8cUjxTIl0--Ganl9jFst10w=s900-mo-c-c0xffffffff-rj-k-no" alt="img-films" name="img-films">' +
            '<div class="placeholder-film">' +
                '<p class="title-film text-film">__title__</p>' +
                '<p class="episode-film text-film">__episode__</p>' +
                '<p class="release-film text-film">__release__</p>' +
            '</div>' +
        '</div>'
    films.forEach(function(film, index){
        containerFilms += templateFilms.replace('__title__', films[index].title)
            .replace('__episode__', films[index].episode_id)
            .replace('__release__', films[index].release_date)
    })
    $("#films").html(containerFilms)

}

$(document).ready(chargePage());