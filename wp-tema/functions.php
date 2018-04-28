<?php 
function zavrsni_enqueue() {
    wp_enqueue_style( 'reset', get_template_directory_uri() . '/reset.css' );
    wp_enqueue_style( 'style-name', get_stylesheet_uri() );
    wp_enqueue_script( 'jquery' );
    wp_register_script( 'main', get_template_directory_uri() . '/js/main.js' );
    $vars = array(
        'dir' => get_template_directory_uri()
    );

    if(is_page()){
        global $wp_query;
            $template_name = get_post_meta( $wp_query->post->ID, '_wp_page_template', true );
            if($template_name == 'tpl-gpoi.php'){
                wp_enqueue_script('gpio-main', get_template_directory_uri() .'/gpio/static/js/site.js');
            }
       }


    wp_localize_script( 'main', 'template', $vars );
    wp_enqueue_script( 'main', get_template_directory_uri() . '/js/main.js' );
}
add_action( 'wp_enqueue_scripts', 'zavrsni_enqueue' );