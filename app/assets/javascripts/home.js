var callPokemones
var crearListenerInfo
var agregarGeneraciones

$(document).ready(function(){

    var cantidad = 0
    var inicio = 0

    var pokemones = $('#pokemons')

    $('#inicio').text(inicio +1 );
    $('#fin').text(inicio + cantidad);

    agregarGeneraciones = function(types){
        var generaciones = ""

        types.forEach( function(type){
            let url = type.type.url;
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'get',
                async: false,
                success: function(data) {
                    generaciones += String(data.generation.name)+' '
                }
            })
        })

        return generaciones
    }

    crearListenerInfo = function () {$('.pokemon-info').on('click', function(){
        let url = $(this).data('url')
        let modalBody = $('#modal-body');

        $.ajax({
            url: url,
            dataType: 'json',
            type: 'get',
            success: function(data) {

                let tipos = '';
                
                data.types.forEach(type => tipos+= type.type.name+' ' )
                 
                let abilities = ''

                data.abilities.forEach(ability => abilities+= ability.ability.name+' '  )

                let moves = ''

                for(i = 0; i < 5; i++){
                    moves += data.moves[i].move.name+' '
                }

                modalBody.html(`<div class="container">
                    <p>${tipos}</p>
                    <p>${data.name}</p>
                    <p>${agregarGeneraciones(data.types)}</p>
                    <p>${abilities}</p>
                    <p>${moves}</p>
                </div>`);
                
                
            }
        })
    })}

    callPokemones = function (){
        cantidad = cantidad + 20
        $.ajax({
            beforeSend: function(){
                pokemones.empty()
            },
            url: 'https://pokeapi.co/api/v2/pokemon?limit='+cantidad+'&offset='+inicio,
            dataType: 'json',
            type: 'get',
            success: function(data){
                
                data.results.forEach(function(pokemon){
                    pokemones.append('<div class="card mb-2 mt-2"><div class="card-header">'+pokemon.name+'</div><div class="card-body"><button data-target="#modalInfo" data-toggle="modal" data-url="'+pokemon.url+'" class="btn btn-info pokemon-info">Quiero saber más</button> </div></div></div>')
                })
                $('#inicio').text(inicio+ 1);
                $('#fin').text(cantidad);
                crearListenerInfo()
            },
            error: function(){
                pokemones.html('Ha ocurrido un error')
            }
        })
    }

    

    

    $('#llamarPokemones').on('click', function(){
        callPokemones()
    })
})

