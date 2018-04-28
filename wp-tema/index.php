<?php get_header(); ?>

<h1> Wordpress server za završni rad </h1>
<h4>Uspiješno je <span><i>podignut</i></span></h4>
<p>By: Leon Redžić</p>


<div class="pages-wrapper">
    <a href="<?= get_field('gpio_page'); ?>">
        <div class="gpio">
            gpio
        </div>
    </a>
    <a href="<?= get_field('speakers_page'); ?>">
        <div class="speaker">
            SPEAKERS
        </div>
    </a>
</div>
<?php get_footer(); ?>