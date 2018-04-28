var socket = io(ajaxurldata.link);
socket.on('status update', function(msg){
    console.log(msg);
    switch(msg.status) {
        case 1:
            $("#status").html(msg.title)
        break;
        case 2:
            $("#status").html("Waiting...")
        break;
        case 3:

        break;
    }
});
$(document).ready(() => {
    $.post( ajaxurldata.link + "/speaker/", { action: "status" }, function( data ) {});
    function initPlayButtons() {
        $(".play-song").click((event) => {
            event.preventDefault();
            $.post( ajaxurldata.link + "/speaker/play", { id: $(event.currentTarget).data("id") }, function( data ) {
                console.log( data );
            });
        })
    }s
    $("#search").submit((event) => {
        event.preventDefault();
        $("#search-results").hide();
        $(".spinner").show();
        let term = $("#search-input").val();
        $.post( ajaxurldata.link + "/speaker/search", { term : term }, function( data ) {
            $("#search-results").html(" ");
            data.forEach(song => {
                let img = "<a href='#' class='play-song' data-id='"+song.id+"'><div class='uk-inline-clip uk-transition-toggle'><img class='song-image' src='"+song.thumb+"' alt='"+song.title+"'/><div class='uk-transition-fade uk-position-cover uk-position-small uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle'><p class='uk-h4 uk-margin-remove'>Play</p></div></div></a>";
                $("#search-results").append("<li>"+img+"<p class='song-title'>"+song.title+"</li>")
            });
            initPlayButtons();
            $("#search-results").show();
            $(".spinner").hide();
        });
    });
    $("#stop").click(() => {
        $.post( ajaxurldata.link + "/speaker/", { action: "stop" }, function( data ) {
            console.log( data );
        });
    });
})
