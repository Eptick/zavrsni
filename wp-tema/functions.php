<?php 
function zavrsni_enqueue() {
    wp_enqueue_style( 'reset', get_template_directory_uri() . '/reset.css' );
    wp_enqueue_style( 'style-name', get_stylesheet_uri() );
    wp_enqueue_script( 'jquery' );
    wp_register_script( 'main', get_template_directory_uri() . '/js/main.js' );
    $vars = array(
        'dir' => get_template_directory_uri()
    );
    wp_localize_script( 'main', 'template', $vars );
    wp_enqueue_script( 'main', get_template_directory_uri() . '/js/main.js' );
}
add_action( 'wp_enqueue_scripts', 'zavrsni_enqueue' );
?>