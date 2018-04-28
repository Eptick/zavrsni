<?php
// Template Name:Speaker
get_header(); ?>
<div class="search">
    <a href="<?= home_url(); ?>"><button class="uk-button uk-button-default" type="button">Home</button></a>
    <form class="uk-search uk-search-large" id="search">
        <span uk-search-icon></span>
        <input class="uk-search-input" type="search" placeholder="Search" id="search-input">
    </form>
</div>
<div class="search-results">
    <div class="spinner" uk-spinner></div>
    <ul class="uk-list uk-list-striped" id="search-results">
    </ul>
</div>
<div id="player-status">
    <p id="status" class="uk-margin-remove">...</p>
    <button id="stop"class="uk-button uk-button-secondary"><span uk-icon="icon: close"></span></button>
</div>
<?php get_footer(); ?>